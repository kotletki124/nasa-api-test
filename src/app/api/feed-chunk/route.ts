import APIHelper from "@/server/APIHelper";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ind = searchParams.get("index");
  const res = await APIHelper.getFeedChunk(ind);
  return new Response(JSON.stringify(res));
}
