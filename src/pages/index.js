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
import Sidebar from 'components/Sidebar';
import SidebarSection from 'components/SidebarSection';
import SidebarSectionHeader from 'components/SidebarSectionHeader';
import SidebarSectionBody from 'components/SidebarSectionBody';
import Posts from 'components/Posts';
import FormSubscribe from 'components/FormSubscribe';
import Button from 'components/Button';

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
          <div>
            <h2 className={`${styles.contentHeader} sr-only`}>Latest Posts</h2>
            <Posts posts={posts} />
            <p className={styles.postsAllPosts}>
              <Link href={getRouteByName('posts')?.path}>View All Posts</Link>
            </p>
          </div>
          <Sidebar>
            <SidebarSection>
              <SidebarSectionHeader>Newsletter</SidebarSectionHeader>
              <SidebarSectionBody>
                <p>
                  Sign up to receive all things Space Jelly and more awesome content from me, Colby Fayock, straight to
                  your inbox!
                </p>
                <FormSubscribe />
              </SidebarSectionBody>
            </SidebarSection>
            <SidebarSection>
              <SidebarSectionHeader>Ecommerce on the Jamstack</SidebarSectionHeader>
              <SidebarSectionBody>
                <p>
                  Learn how to build an online store with modern tools like Next.js, Snipcart, and headless WordPress.
                </p>
                <p>
                  <Button href="https://www.leveluptutorials.com/tutorials/ecommerce-on-the-jamstack-with-snipcart-next-js-and-wordpress">
                    Get Started at Level Up Tutorials
                  </Button>
                </p>
              </SidebarSectionBody>
            </SidebarSection>
          </Sidebar>
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
