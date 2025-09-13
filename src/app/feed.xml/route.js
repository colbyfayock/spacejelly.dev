import { getFeedData } from "../../lib/posts";
import { generateFeed } from "../../lib/util";

export async function GET() {
  try {
    const data = await getFeedData();
    const feedXml = generateFeed(data);

    const headers = {
      "Content-Type": "application/rss+xml",
    };

    if (process.env.NODE_ENV === "production") {
      headers["Cache-Control"] =
        "public, max-age=3600, stale-while-revalidate=86400";
    }

    return new Response(feedXml, {
      headers,
    });
  } catch (error) {
    console.error("Error generating feed:", error);
    return new Response(`Error generating feed: ${error.message}`, {
      status: 500,
    });
  }
}

export const dynamic = "force-dynamic";
