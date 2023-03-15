import { WebpageJsonLd } from 'lib/json-ld';
import useSite from 'hooks/use-site';

import Head from 'components/Head';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import PostCard from 'components/PostCard';

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
  const { metadata = {} } = useSite();
  const { title: siteTitle } = metadata;

  let metaDescription = `Read ${posts.length} posts from ${title} at ${siteTitle}.`;

  if (description) {
    metaDescription = `${metaDescription} ${description}`;
  }

  return (
    <Layout>
      <Head
        title={title}
        description={metaDescription}
        ogImage={{
          title,
          layout: 'page',
        }}
      />

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

      <Section className={styles.postsSection}>
        <Container size="content">
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
