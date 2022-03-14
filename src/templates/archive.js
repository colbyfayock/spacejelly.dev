import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { getPosts } from 'lib/posts';
import { getSpaceJellyOgPageUrl } from 'lib/cloudinary';
import { WebpageJsonLd } from 'lib/json-ld';
import useSite from 'hooks/use-site';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';
import PostCard from 'components/PostCard';

import searchIndex from 'public/wp-search.json';

import styles from 'styles/templates/Archive.module.scss';

const DEFAULT_POST_OPTIONS = {};

export default function TemplateArchive({
  title = 'Archive',
  Title,
  description,
  posts,
  postOptions = DEFAULT_POST_OPTIONS,
  slug,
}) {
  const [index, setIndex] = useState();

  const { metadata = {} } = useSite();
  const { title: siteTitle } = metadata;

  let metaDescription = `Read ${posts.length} posts from ${title} at ${siteTitle}.`;

  if (description) {
    metaDescription = `${metaDescription} ${description}`;
  }

  const ogImage = getSpaceJellyOgPageUrl({
    headline: title,
  });

  useEffect(() => {
    (async function run() {
      const results = fetch('/wp-search.json').then((r) => r.json());
      setIndex(results);
    })();
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:width" content="2024" />
        <meta property="og:image:height" content="1012" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={ogImage} />
      </Helmet>

      <WebpageJsonLd title={title} description={metaDescription} siteTitle={siteTitle} slug={slug} />

      <Header>
        <Container>
          <h1>{Title || title}</h1>
          {description && (
            <p
              className={styles.archiveDescription}
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          )}
        </Container>
      </Header>

      <Section>
        <Container>
          <h2 className="sr-only">Posts</h2>
          <ul className={styles.posts}>
            {posts.map((post) => {
              return (
                <li key={post.slug}>
                  <PostCard post={post} options={postOptions} />
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>
    </Layout>
  );
}
