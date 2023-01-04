import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Link from 'next/link';
import { FaTwitter } from 'react-icons/fa';
import { BsDiscord } from 'react-icons/bs';
import { gql } from '@apollo/client';
import { CldImage } from 'next-cloudinary';

import { getApolloClient } from 'lib/apollo-client';
import { getRouteByName } from 'lib/routes';
import { getAllPosts, postPathBySlug } from 'lib/posts';
import { getPageById } from 'lib/pages';
import { WebsiteJsonLd } from 'lib/json-ld';
import useSite from 'hooks/use-site';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import Posts from 'components/Posts';
import FormSubscribe from 'components/FormSubscribe';
import Button from 'components/Button';
import Heading from 'components/Heading';
import CosmoWave from 'components/CosmoWave';
import GalaxyCloud from 'components/GalaxyCloud';
import MountainRange from 'components/MountainRange';
import ShoreRocks from 'components/ShoreRocks';

import styles from 'styles/pages/Home.module.scss';

export default function Home({ page, latestPost, posts }) {
  const { metadata = {} } = useSite();
  const { title } = metadata;

  const featuredCourse = page?.featuredCourse?.featuredcourse;

  return (
    <Layout>
      <h1
        className="sr-only"
        dangerouslySetInnerHTML={{
          __html: title,
        }}
      />

      <Section className={styles.heroSection}>
        <GalaxyCloud className={styles.heroGalaxyCloud} />
        <Container className={styles.heroContainer} size="narrow">
          <div className={styles.heroFeature}>
            <div className={styles.heroFeatureLatest}>
              <Heading className={styles.heading} as="h2" color="orange">
                Latest
              </Heading>
              <Posts posts={[latestPost]} />
              <p className={styles.heroFeatureLatestLink}>
                <Button href={postPathBySlug(latestPost.slug)}>Learn How</Button>
              </p>
            </div>
            <div className={styles.heroFeatureCosmo}>
              <CosmoWave />
            </div>
          </div>
          <div className={styles.heroTech}>
            <Heading className={styles.heading} as="h2" color="orange">
              Tutorials by Tech
            </Heading>
            <ul>
              <li>Tech</li>
            </ul>
          </div>
        </Container>
      </Section>

      <Section className={styles.featuredSection}>
        <MountainRange className={styles.featuredMountainRange} />
        <Container className={styles.featuredContainer}>
          <div className={styles.featuredFeatures}>
            <div className={styles.featuredCourse}>
              <Heading
                className={styles.heading}
                as="h2"
                color="orange"
                action={{
                  title: 'View All Courses',
                  link: '/courses',
                }}
              >
                Featured Course
              </Heading>
              <a href={featuredCourse.course.courseLink}>
                <img
                  width={featuredCourse.featuredImage.node.mediaDetails.width}
                  height={featuredCourse.featuredImage.node.mediaDetails.height}
                  src={featuredCourse.featuredImage.node.sourceUrl}
                  alt="Course Cover Image"
                />
              </a>
            </div>
            <div className={styles.featuredNewsletter}>
              <Heading className={styles.heading} as="h2" color="orange">
                Newsletter
              </Heading>
              <Heading className={styles.featuredTitle} as="h3">
                Get new web dev tutorials in your inbox!
              </Heading>
              <p>Sign up to receive all things Space Jelly and more free content straight to your inbox!</p>
              <FormSubscribe />
            </div>
          </div>
          <div className={styles.featuredCommunity}>
            <Heading className={styles.heading} as="h2" color="orange">
              Community
            </Heading>
            <ul>
              <li>
                <a href="https://spacejelly.dev/discord" target="_blank" rel="noreferrer noopener">
                  <BsDiscord /> Space Jelly
                </a>
              </li>
              <li>
                <a href="https://twitter.com/colbyfayock" target="_blank" rel="noreferrer noopener">
                  <FaTwitter /> @colbyfayock
                </a>
              </li>
            </ul>
          </div>
        </Container>
      </Section>

      <Section className={styles.morePostsSection}>
        <ShoreRocks className={styles.morePostsShoreRocks} />
        <Container className={styles.morePostsContainer}>
          <div>
            <Heading className={styles.heading} as="h2" color="orange">
              Some More Recent Posts
            </Heading>
            <Posts posts={posts} />
            <p className={styles.morePostsLink}>
              <Link href={getRouteByName('posts')?.path}>View All Posts</Link>
            </p>
          </div>
        </Container>
      </Section>

      <WebsiteJsonLd siteTitle={title} />
    </Layout>
  );
}

export async function getStaticProps() {
  const apolloClient = getApolloClient();

  const { data } = await apolloClient.query({
    query: gql`
      query HomePage($id: ID!) {
        page(id: $id) {
          featuredCourse {
            featuredcourse {
              ... on Course {
                id
                featuredImage {
                  node {
                    sourceUrl
                    mediaDetails {
                      height
                      width
                    }
                  }
                }
                course {
                  courseLink
                }
                title
              }
            }
          }
          id
        }
      }
    `,
    variables: {
      id: 'cG9zdDoxNTAz',
    },
  });

  const { posts } = await getAllPosts({
    queryIncludes: 'archive',
  });

  const latestPost = posts.shift();

  return {
    props: {
      page: data?.page,
      latestPost,
      posts: posts.sort((post) => (post.isSticky ? -1 : 1)).slice(0, 5),
    },
  };
}
