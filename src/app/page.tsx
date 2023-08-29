import Shop from "../components/ShopComponent";
import APIHelper from "../server/APIHelper";

async function getFeed() {
  return await APIHelper.getFeedChunk(0);
}

export default async function Home() {
  const feed = (await getFeed()) || [];
  return <Shop initialState={{ feed }} chunkInd={1} />;
}
