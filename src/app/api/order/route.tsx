import APIHelper from "@/server/APIHelper";

export async function POST(request: Request) {
  const idsArr = await request.json();
  const dataArr = await APIHelper.getObjectsFeedData(idsArr);
  return new Response(JSON.stringify(dataArr));
}
