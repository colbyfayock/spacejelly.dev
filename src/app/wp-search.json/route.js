import { getAllPosts } from "../../lib/posts";
import { generateIndexSearch } from "../../lib/util-server";

export async function GET() {
  try {
    const data = await getAllPosts();
    const searchIndex = await generateIndexSearch(data);

    const headers = {
      "Content-Type": "application/json",
    };

    if (process.env.NODE_ENV === "production") {
      headers["Cache-Control"] =
        "public, max-age=3600, stale-while-revalidate=86400";
    }

    return new Response(searchIndex, {
      headers,
    });
  } catch (error) {
    console.error("Error generating search index:", error);
    return new Response(`Error generating search index: ${error.message}`, {
      status: 500,
    });
  }
}

export const dynamic = "force-dynamic";
