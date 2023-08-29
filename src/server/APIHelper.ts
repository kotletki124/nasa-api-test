import Cache from "file-system-cache";
import settings from "../globalSettings";

const AsyncLock = require("async-lock");
const lock = new AsyncLock();

const { cachePath, feedChunkSize } = settings;
const cache = Cache({
  basePath: cachePath,
});

let metadata = cache.getSync("metadata") || {};

const today = () => new Date().toISOString().split("T")[0];

function transformDateFormat(dateString) {
  const months = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ];

  const [year, month, day] = dateString.split("-");
  const monthName = months[parseInt(month) - 1];

  return `${day} ${monthName} ${year}`;
}

function processFeedObject(obj) {
  const cad = obj.close_approach_data[0],
    d = obj.estimated_diameter.meters;
  const newObj = {};
  newObj.id = obj.id;
  newObj.name = obj.name.match(/\((.*?)\)/)[1];
  newObj.date = transformDateFormat(cad.close_approach_date);
  newObj.dateTimestamp = cad.epoch_date_close_approach;
  newObj.distance = {
    km: Math.round(cad.miss_distance.kilometers),
    lunar: Math.round(cad.miss_distance.lunar),
  };
  newObj.diameter = Math.round(
    (d.estimated_diameter_min + d.estimated_diameter_max) / 2
  );
  newObj.hazardous = obj.is_potentially_hazardous_asteroid;
  return newObj;
}

function processLookupObject(obj) {
  const newObj = processFeedObject(obj);
  newObj.h = obj.absolute_magnitude_h;

  const closeApproachData = obj.close_approach_data.map((cad) => {
    const newData = {};
    newData.date = transformDateFormat(cad.close_approach_date);
    newData.time = cad.close_approach_date_full.split(" ")[1];
    newData.dateTimestamp = cad.epoch_date_close_approach;
    newData.velocity = Math.round(cad.relative_velocity.kilometers_per_hour);
    newData.distance = Math.round(cad.miss_distance.kilometers);
    newData.orbitingBody = cad.orbiting_body;

    return newData;
  });

  const currentDateTimestamp = Date.now();

  const date = closeApproachData.reduce((closest, object) => {
    const timeDifference = Math.abs(
      object.dateTimestamp - currentDateTimestamp
    );

    if (
      timeDifference < Math.abs(closest.dateTimestamp - currentDateTimestamp)
    ) {
      return object;
    } else {
      return closest;
    }
  }, closeApproachData[0]).date;

  const res = { ...newObj, closeApproachData, date };
  cache.set(res.id, res);

  return { ...newObj, closeApproachData, date };
}

async function processFeedData(data, feedDate = today()) {
  let currChunkInd = metadata.currChunkInd || 0,
    currChunk = metadata.feedLeftover || [];

  const objects = (await cache.get("objects")) || {};

  let objectsArr = Object.values(data["near_earth_objects"])
    .flat()
    .sort((a, b) => {
      const dateA = a.close_approach_data[0].epoch_date_close_approach;
      const dateB = b.close_approach_data[0].epoch_date_close_approach;

      return dateA - dateB;
    });

  if (currChunkInd !== 0) {
    objectsArr = objectsArr.filter((obj) => !objects[obj.id]);
  }

  for (let obj of objectsArr) {
    const newObj = processFeedObject(obj);
    if (currChunk.length >= feedChunkSize) {
      await cache.set(`feedChunk${currChunkInd++}`, currChunk);
      currChunk = [];
    }
    currChunk.push(newObj);
    objects[newObj.id] = newObj;
  }

  metadata = {
    feedDate,
    currChunkInd,
    nextFeedLink: data.links.next,
    feedLeftover: currChunk,
  };

  await cache.save([
    { key: "metadata", value: metadata },
    { key: "objects", value: objects },
  ]);
}

async function fetchFeed(
  link = "https://api.nasa.gov/neo/rest/v1/feed?api_key=DEMO_KEY&start_date=" +
    today()
) {
  let responseData = await fetch(link).then((r) => r.json());
  return responseData;
}

async function fetchLookup(id) {
  const link = `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=DEMO_KEY`;
  let responseData = await fetch(link).then((r) => r.json());
  return responseData;
}

export const prepareFeedCache = async (
  ind,
  todayDate = today(),
  forceClearCache = false
) =>
  lock.acquire("feedCachePreparing", async () => {
    if (!metadata || metadata.feedDate !== todayDate || forceClearCache) {
      metadata = {};
      const responseData = await Promise.all([fetchFeed(), cache.clear()]).then(
        (values) => values[0]
      );
      return processFeedData(responseData, todayDate);
    } else if (ind >= metadata.currChunkInd - feedChunkSize) {
      return fetchFeed(metadata.nextFeedLink).then(async (responseData) =>
        processFeedData(responseData, todayDate)
      );
    }
  });

const APIHelper = {
  getFeedChunk: async (ind) => {
    const todayDate = today();
    let chunk =
      metadata &&
      metadata.feedDate === todayDate &&
      (await cache.get(`feedChunk${ind}`));

    if (!chunk) {
      await prepareFeedCache(ind, todayDate, ind === 0);
      chunk = await cache.get(`feedChunk${ind}`);
    } else prepareFeedCache(ind, todayDate);
    return chunk;
  },
  getObject: async (id) => {
    let obj = await cache.get(id);
    if (!obj) {
      let responseData = await fetchLookup(id);
      obj = await processLookupObject(responseData);
    }
    return obj;
  },
  getObjectsFeedData: async (idsArr) => {
    const objects = await cache.get("objects");
    return idsArr
      .map((id) => objects[id])
      .sort((a, b) => {
        return a.dateTimestamp - b.dateTimestamp;
      });
  },
};

export default APIHelper;
