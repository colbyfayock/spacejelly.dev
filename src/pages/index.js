import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { getAllPosts } from 'lib/posts';
import { WebsiteJsonLd } from 'lib/json-ld';
import useSite from 'hooks/use-site';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import Posts from 'components/Posts';

import styles from 'styles/pages/Home.module.scss';

export default function Home({ posts }) {
  const { metadata = {} } = useSite();
  const { title } = metadata;

  return (
    <Layout>
      <WebsiteJsonLd siteTitle={title} />

      <h1
        className="sr-only"
        dangerouslySetInnerHTML={{
          __html: title,
        }}
      />

      <Section className={styles.postsSection}>
        <Container className={styles.postsContainer}>
          <div className={styles.content}>
            <h2 className="sr-only">Posts</h2>
            <Posts posts={posts} />
          </div>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarSectionHeader}>Newsletter</h3>
              <div className={styles.sidebarSectionBody}>
                <p>
                  Sign up to receive all things Space Jelly and more awesome content straight to your inbox!
                </p>
                <form>
                  <input type="text" />
                </form>
              </div>
            </div>
          </aside>
        </Container>
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  const { posts } = await getAllPosts();
  return {
    props: {
      posts: posts.sort((post) => (post.isSticky ? -1 : 1)),
    },
  };
}
