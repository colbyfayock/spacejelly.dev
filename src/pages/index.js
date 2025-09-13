import Link from "next/link";
import { FaTwitter, FaYoutube } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";
import { gql } from "@apollo/client";

import { getApolloClient } from "lib/apollo-client";
import { getRouteByName } from "lib/routes";
import { getAllPosts, postPathBySlug } from "lib/posts";
import { getAllTags } from "lib/tags";
import { WebsiteJsonLd } from "lib/json-ld";
import useSite from "hooks/use-site";

import { HOME_TAGS } from "data/home";

import Head from "components/Head";
import Layout from "components/Layout";
import Section from "components/Section";
import Container from "components/Container";
import Posts from "components/Posts";
import FormSubscribe from "components/FormSubscribe";
import Button from "components/Button";
import Heading from "components/Heading";
import CldImage from "components/CldImage";
import CosmoWave from "components/CosmoWave";
import GalaxyCloud from "components/GalaxyCloud";
import Waves from "components/Waves";
import MountainRange from "components/MountainRange";
import ShoreRocks from "components/ShoreRocks";

import styles from "styles/pages/Home.module.scss";

export default function Home({ page, latestPost, posts, featuredTags }) {
  const { metadata = {} } = useSite();
  const { title: siteTitle, description: siteDescription } = metadata;

  const title = `${siteTitle} - Web Development Tutorials for _This_ Universe`;
  const metaDescription = `${siteDescription} at ${title}`;

  const featuredCourse = page?.featuredCourse?.featuredcourse;

  return (
    <Layout>
      <Head
        title={title}
        description={metaDescription}
        ogImage={{
          layout: "home",
        }}
      />

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
              <Posts
                posts={[latestPost]}
                postCard={{
                  excludeMetadata: ["tags"],
                }}
              />
              <p className={styles.heroFeatureLatestLink}>
                <Button href={postPathBySlug(latestPost.slug)}>
                  Learn How
                </Button>
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
            <ul className={styles.heroFeaturedTags}>
              {featuredTags.map((tag) => {
                return (
                  <li key={tag.uri}>
                    <Link href={tag.uri}>
                      <CldImage
                        width={tag.logo?.width}
                        height={tag.logo?.height}
                        src={tag.logo?.url}
                        format="svg"
                        alt={tag.name}
                        style={{
                          width: tag.logo?.width,
                        }}
                      />
                    </Link>
                  </li>
                );
              })}
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
                  title: "View All Courses",
                  link: "/courses",
                }}
              >
                Featured Course
              </Heading>
              <a href={featuredCourse.course.courseLink}>
                <CldImage
                  width="1800"
                  height="900"
                  src={featuredCourse.featuredImage.node.sourceUrl}
                  alt={featuredCourse.title}
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
              <p>
                Sign up to receive all things Space Jelly and more free content
                straight to your inbox!
              </p>
              <FormSubscribe location="home" />
            </div>
          </div>
          <div className={styles.featuredCommunity}>
            <Heading className={styles.heading} as="h2" color="orange">
              Community
            </Heading>
            <ul>
              <li>
                <a
                  href="https://twitter.com/colbyfayock"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FaTwitter /> @colbyfayock
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/colbyfayock"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FaYoutube /> @colbyfayock
                </a>
              </li>
              <li>
                <a
                  href="https://spacejelly.dev/discord"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <BsDiscord /> Space Jelly
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
            <Posts
              posts={posts}
              postCard={{
                excludeMetadata: ["tags"],
              }}
            />
            <p className={styles.morePostsLink}>
              <Link href={getRouteByName("posts")?.path}>View All Posts</Link>
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
      id: "cG9zdDoxNTAz",
    },
  });

  const { posts } = await getAllPosts({
    queryIncludes: "archive",
  });

  const latestPost = posts.shift();

  const { tags: allTags } = await getAllTags();
  const featuredTags = HOME_TAGS.map((homeTag) => {
    const tag = allTags.find(({ slug }) => slug === homeTag.slug);
    return {
      ...tag,
      logo: {
        ...tag.logo,
        width: homeTag.width,
        height: homeTag.height,
      },
    };
  });

  return {
    props: {
      page: data?.page,
      latestPost,
      posts: posts.sort((post) => (post.isSticky ? -1 : 1)).slice(0, 5),
      featuredTags,
    },
  };
}
