import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { FaDesktop, FaCode, FaRocket } from 'react-icons/fa';

import { getPostBySlug, getRecentPosts, parseIntroFromContent, getPostsByCategoryId } from 'lib/posts';
import { categoryPathBySlug } from 'lib/categories';
import { formatDate } from 'lib/datetime';
import { ArticleJsonLd } from 'lib/json-ld';
import { addIdsToHeadersHtml, applySyntaxHighlighting, getHeadersAnchorsFromHtml } from 'lib/parse';
import useSite from 'hooks/use-site';

import Head from 'components/Head';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';
import PostMetadata from 'components/PostMetadata';
import Anchors from 'components/Anchors';
import Video from 'components/Video';
import Posts from 'components/Posts';
import Sidebar from 'components/Sidebar';
import SidebarSection from 'components/SidebarSection';
import Heading from 'components/Heading';
import FormSubscribe from 'components/FormSubscribe';

import styles from 'styles/pages/Post.module.scss';

export default function Post({ post, anchors, related }) {
  const { metadata } = useSite();
  const { title: siteTitle } = metadata;

  const {
    author,
    cardtitle,
    categories,
    content,
    date,
    demorepourl,
    demostarterurl,
    demowebsiteurl,
    intro,
    isSticky = false,
    modified,
    tags,
    title,
    video,
    seo,
  } = post;

  const metadataOptions = {
    compactCategories: false,
  };

  let metaDescription = `Read ${title} at ${siteTitle}.`;

  if (seo?.metaDesc) {
    metaDescription = seo.metaDesc;
  }

  const { ref: videoContainerRef, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <Layout>
      <Head
        title={title}
        description={metaDescription}
        ogImage={{
          title: cardtitle || title,
          layout: 'post',
        }}
      />

      <Content>
        <Section className={styles.contentSection}>
          <Container className={styles.contentContainer} size="narrow">
            <div>
              <header className={styles.postHeader}>
                <h1
                  className={styles.title}
                  dangerouslySetInnerHTML={{
                    __html: title,
                  }}
                />

                <PostMetadata
                  className={styles.postMetadata}
                  date={date}
                  author={author}
                  categories={categories}
                  tags={tags}
                  options={metadataOptions}
                />
              </header>

              {intro && (
                <div
                  className={styles.postIntro}
                  dangerouslySetInnerHTML={{
                    __html: intro,
                  }}
                />
              )}

              {Array.isArray(anchors) && (
                <div className={styles.postIntroAnchors}>
                  <Anchors className={styles.postAnchors} anchors={anchors} headline="Table of Contents" />
                </div>
              )}

              <div className={styles.resources}>
                <ul className={styles.resourcesLinks}>
                  {demowebsiteurl && (
                    <li>
                      <a href={demowebsiteurl}>
                        <FaDesktop /> View Demo Website
                      </a>
                    </li>
                  )}
                  {demorepourl && (
                    <li>
                      <a href={demorepourl}>
                        <FaCode /> See the Code
                      </a>
                    </li>
                  )}
                  {demostarterurl && (
                    <li>
                      <a href={demostarterurl}>
                        <FaRocket /> Grab the Starter
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              {video && (
                <div ref={videoContainerRef}>
                  <Video className={styles.postVideo} {...video} title={`Video for ${title}`} isActive={inView} />
                </div>
              )}

              <div
                className={styles.postContent}
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />

              <div className={styles.postFooter}>
                <p className={styles.postModified}>Last updated on {formatDate(modified)}.</p>
              </div>
            </div>
            <Sidebar className={styles.postSidebar}>
              <SidebarSection className={styles.postSidebarToc}>
                {Array.isArray(anchors) && (
                  <Anchors className={styles.postAnchors} anchors={anchors} headline="Table of Contents" />
                )}
              </SidebarSection>
              <SidebarSection className={styles.postSidebarNewsletter}>
                <Heading className={styles.postSidebarHeading} as="p">
                  Newsletter
                </Heading>
                <p className={styles.postSidebarText}>More free tutorials straight to your inbox.</p>
                <FormSubscribe className={styles.postSidebarForm} />
              </SidebarSection>
            </Sidebar>
          </Container>
        </Section>

        {/* <Section className={styles.relatedSection}>
          <Container>
            <h2>
              More from{' '}
              <Link className={styles.relatedSectionLink} href={categoryPathBySlug(related.slug)}>
                {related.name}
              </Link>
            </h2>
            <Posts
              className={styles.relatedPosts}
              posts={related?.posts}
              postCard={{
                className: styles.relatedPostsCard,
                excludeMetadata: ['categories', 'date'],
              }}
            />
          </Container>
        </Section> */}
      </Content>

      <ArticleJsonLd post={post} siteTitle={siteTitle} />
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { post } = await getPostBySlug(params?.slug);

  if (!post) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { title, categories } = post;
  let { content } = post;

  const relatedCategory = categories[0];
  const related = await getPostsByCategoryId(relatedCategory?.categoryId, {
    queryIncludes: 'index',
  });
  const relatedPosts = related?.posts.filter(({ slug }) => slug !== params?.slug).slice(0, 3);

  // Parse the HTML and add IDs to all of the
  // h2 headers

  content = await addIdsToHeadersHtml({
    html: content,
  });

  content = await applySyntaxHighlighting({
    html: content,
  });

  // Generate the anchors which will be used for the
  // table of contents

  const anchors = getHeadersAnchorsFromHtml({
    html: content,
  });

  // In order to support having a block of intro text with a video and TOC
  // between that and the rest of the content, we want to search the content
  // for the <!--more--> tag if it exists which designates where that split
  // should occur in the content

  const { intro = '', content: moreContent } = parseIntroFromContent(content);

  if (intro.length > 0) {
    content = moreContent;
  }

  if (post.video) {
    let oembed, thumbnail;

    if (post.video.includes('youtube.com')) {
      try {
        oembed = await fetch(`https://www.youtube.com/oembed?url=${post.video}`).then((r) => r.json());
      } catch (e) {
        console.log(`Failed to fetch oembed for ${post.video} on ${title}: ${e}`);
      }

      if (oembed) {
        const { thumbnail_url } = oembed;
        const maxResUrl = thumbnail_url.replace('hqdefault', 'maxresdefault');

        const maxResExists = await fetch(maxResUrl, { method: 'HEAD' }).then((r) => r.ok);

        thumbnail = maxResExists ? maxResUrl : thumbnail_url;
      }
    }

    if (oembed) {
      post.video = {
        url: post.video,
        provider: oembed.provider_name,
        thumbnail: {
          url: thumbnail,
          width: oembed.thumbnail_width,
          height: oembed.thumbnail_height,
          html: oembed.html,
        },
      };
    }
  }

  return {
    props: {
      post: {
        ...post,
        content,
        intro,
      },
      anchors,
      related: {
        ...relatedCategory,
        posts: relatedPosts,
      },
    },
  };
}

export async function getStaticPaths() {
  const { posts } = await getRecentPosts({
    count: process.env.POSTS_PRERENDER_COUNT,
    queryIncludes: 'index',
  });

  const paths = posts.map((post) => {
    const { slug } = post;
    return {
      params: {
        slug,
      },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
}
