import { authorPathByName } from 'lib/users';
import { postPathBySlug } from 'lib/posts';
import { pagePathBySlug } from 'lib/pages';

import config from '../../package.json';

export function ArticleJsonLd({ post = {}, siteTitle = '' }) {
  const { homepage = '', faviconPath = '/favicon.ico' } = config;
  const { title, slug, excerpt, date, author, categories, modified, featuredImage } = post;
  const path = postPathBySlug(slug);
  const datePublished = !!date && new Date(date);
  const datePublishedYear = datePublished instanceof Date && datePublished.getFullYear();
  const datePublishedIso = datePublished instanceof Date && datePublished.toISOString();
  const dateModified = !!modified && new Date(modified);
  const dateModifiedIso = dateModified instanceof Date && dateModified.toISOString();

  /** TODO - As image is a recommended field would be interesting to have a
   * default image in case there is no featuredImage comming from WP,
   * like the open graph social image
   * */

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${homepage}${path}`,
    },
    headline: title,
    image: [featuredImage?.sourceUrl],
    datePublished: datePublishedIso || '',
    dateModified: dateModifiedIso || datePublishedIso || '',
    description: excerpt,
    keywords: [categories.map(({ name }) => `${name}`).join(', ')],
    copyrightYear: datePublishedYear || '',
    author: {
      '@type': 'Person',
      name: author?.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteTitle,
      logo: {
        '@type': 'ImageObject',
        url: `${homepage}${faviconPath}`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}

export function WebsiteJsonLd({ siteTitle = '' }) {
  const { homepage = '' } = config;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteTitle,
    url: homepage,
    copyrightYear: new Date().getFullYear(),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${homepage}/search/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}

export function WebpageJsonLd({ title = '', description = '', siteTitle = '', slug = '' }) {
  const { homepage = '' } = config;
  const path = pagePathBySlug(slug);

  const jsonLd = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: `${homepage}${path}`,
    publisher: {
      '@type': 'ProfilePage',
      name: siteTitle,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}

export function AuthorJsonLd({ author = {} }) {
  const { homepage = '' } = config;
  const { name, avatar, description } = author;
  const path = authorPathByName(name);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name,
    image: avatar?.url,
    url: `${homepage}${path}`,
    description: description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
