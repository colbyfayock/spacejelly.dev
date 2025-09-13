import { getSitemapData } from "../../lib/pages";
import { generateSitemap } from "../../lib/util";

export async function GET() {
  try {
    const data = await getSitemapData();

    // Get Next.js config for trailingSlash setting
    const nextConfig = {};
    const sitemapXml = await generateSitemap(data, nextConfig);

    const headers = {
      "Content-Type": "application/xml",
    };

    if (process.env.NODE_ENV === "production") {
      headers["Cache-Control"] =
        "public, max-age=3600, stale-while-revalidate=86400";
    }

    return new Response(sitemapXml, {
      headers,
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response(`Error generating sitemap: ${error.message}`, {
      status: 500,
    });
  }
}

export const dynamic = "force-dynamic";
