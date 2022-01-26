import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Link from 'next/link';

import { getRouteByName } from 'lib/routes';
import { getAllPosts } from 'lib/posts';
import { WebsiteJsonLd } from 'lib/json-ld';
import useSite from 'hooks/use-site';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import Posts from 'components/Posts';
import FormSubscribe from 'components/FormSubscribe';

import styles from 'styles/pages/Home.module.scss';

export default function Home({ posts }) {
  const { metadata = {} } = useSite();
  const { title } = metadata;

  return (
    <Layout>
      <h1
        className="sr-only"
        dangerouslySetInnerHTML={{
          __html: title,
        }}
      />

      <Section className={styles.postsSection}>
        <Container className={styles.postsContainer}>
          <div className={styles.content}>
            <h2 className={`${styles.contentHeader} sr-only`}>Latest Posts</h2>
            <Posts posts={posts} />
            <p className={styles.postsAllPosts}>
              <Link href={getRouteByName('posts')?.path}>
                <a>View All Posts</a>
              </Link>
            </p>
          </div>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarSectionHeader}>Newsletter</h3>
              <div className={styles.sidebarSectionBody}>
                <p>
                  Sign up to receive all things Space Jelly and more awesome content from me, Colby Fayock, straight to
                  your inbox!
                </p>
                <FormSubscribe />
              </div>
            </div>
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarSectionHeader}>Ecommerce on the Jamstack</h3>
              <div className={styles.sidebarSectionBody}>
                <p>
                  Learn how to build an online store with modern tools like Next.js, Snipcart, and headless WordPress.
                </p>
                <p>
                  <a
                    className={styles.sidebarButton}
                    href="https://www.leveluptutorials.com/tutorials/ecommerce-on-the-jamstack-with-snipcart-next-js-and-wordpress"
                  >
                    Get Started at Level Up Tutorials
                  </a>
                </p>
              </div>
            </div>
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarSectionHeader}>Colbyashi Maru</h3>
              <div className={styles.sidebarSectionBody}>
                <p>
                  Watch developers like you face off with Colbyashi Maru, a 1-hour code challenge with today's most
                  exciting web tech.
                </p>
                <p>
                  <Link href={getRouteByName('colbyashiMaru')?.path}>
                    <a className={styles.sidebarButton}>See the Schedule</a>
                  </Link>
                </p>
              </div>
            </div>
          </aside>
        </Container>
      </Section>

      <WebsiteJsonLd siteTitle={title} />
    </Layout>
  );
}

export async function getStaticProps() {
  const { posts } = await getAllPosts({
    queryIncludes: 'archive',
  });

  return {
    props: {
      posts: posts.sort((post) => (post.isSticky ? -1 : 1)).slice(0, 5),
    },
  };
}
