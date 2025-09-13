/**
 * generateFeed
 */

export async function generateFeed({ posts = [], metadata = {} }) {
  const RSS = (await import("rss")).default;
  const config = require("../../package.json");
  const { homepage = "" } = config;

  const feed = new RSS({
    title: metadata.title || "",
    description: metadata.description,
    site_url: homepage,
    feed_url: `${homepage}/feed.xml`,
    copyright: `${new Date().getFullYear()} ${metadata.title}`,
    language: metadata.language,
    pubDate: new Date(),
  });

  posts.map((post) => {
    feed.item({
      title: post.title,
      guid: `${homepage}/posts/${post.slug}`,
      url: `${homepage}/posts/${post.slug}`,
      date: post.date,
      description: post.excerpt,
      author: post.author?.name || post.author?.displayName || "",
      categories: (post.categories || [])
        .map((category) => category.name || "")
        .filter(Boolean),
    });
  });

  return feed.xml({ indent: true });
}

/**
 * generateSitemap
 */

export async function generateSitemap(
  { posts = [], pages = [] },
  nextConfig = {},
) {
  const prettier = await import("prettier");
  const config = require("../../package.json");
  const { homepage = "" } = config;
  const { trailingSlash } = nextConfig;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${homepage}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
        ${pages
          .map((page) => {
            const lastmod = page.modified
              ? new Date(page.modified).toISOString()
              : new Date().toISOString();
            return `<url>
                      <loc>${homepage}/${page.slug}${trailingSlash ? "/" : ""}</loc>
                      <priority>0.3</priority>
                      <lastmod>${lastmod}</lastmod>
                    </url>
                `;
          })
          .join("")}
          ${posts
            .map((post) => {
              const lastmod = post.modified
                ? new Date(post.modified).toISOString()
                : new Date().toISOString();
              return `<url>
                        <loc>${homepage}/posts/${post.slug}${trailingSlash ? "/" : ""}</loc>
                        <lastmod>${lastmod}</lastmod>
                      </url>
                  `;
            })
            .join("")}
    </urlset>
    `;

  const sitemapFormatted = await prettier.default.format(sitemap, {
    printWidth: 120,
    parser: "html",
  });

  return sitemapFormatted;
}

/**
 * generateIndexSearch
 */

export async function generateIndexSearch({ posts }) {
  const he = (await import("he")).default;

  const index = posts.map((post = {}) => {
    // We need to decode the title because we're using the
    // rendered version which assumes this value will be used
    // within the DOM

    const title = he.decode(post.title);

    // Extract category names to match production format
    const categories = Array.isArray(post.categories)
      ? post.categories.map((category) => category.name || category)
      : post.categories;

    return {
      title,
      slug: post.slug,
      date: post.date,
      categories,
    };
  });

  const indexJson = JSON.stringify({
    generated: Date.now(),
    posts: index,
  });

  return indexJson;
}

/**
 * generateIndexColbyashiMaru
 */

export function generateIndexColbyashiMaru({ episodes }) {
  const keysToInclude = [
    "id",
    "slug",
    "title",
    "company",
    "date",
    "name",
    "role",
    "twitterhandle",
    "socialImage",
    "youtube",
  ];

  const index = episodes.map((episode) => {
    let data = {};

    keysToInclude.forEach((key) => {
      data[key] = episode[key];
    });

    return data;
  });

  const indexJson = JSON.stringify({
    generated: Date.now(),
    episodes: index,
  });

  return indexJson;
}
