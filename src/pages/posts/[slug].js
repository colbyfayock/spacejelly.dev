import path from 'path';
import Link from 'next/link';
import { Helmet } from 'react-helmet';
import { useInView } from 'react-intersection-observer';

import { getPostBySlug, getAllPosts, parseIntroFromContent, getPostsByCategoryId } from 'lib/posts';
import { categoryPathBySlug } from 'lib/categories';
import { formatDate } from 'lib/datetime';
import { ArticleJsonLd } from 'lib/json-ld';
import { getSpaceJellyOgPostUrl } from 'lib/cloudinary';
import { addIdsToHeadersHtml, getHeadersAnchorsFromHtml } from 'lib/parse';
import useSite from 'hooks/use-site';
import useOnLoad from 'hooks/use-onload';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';
import Metadata from 'components/Metadata';
import FeaturedImage from 'components/FeaturedImage';
import Button from 'components/Button';
import Anchors from 'components/Anchors';
import Video from 'components/Video';
import Posts from 'components/Posts';
import Sidebar from 'components/Sidebar';
import SidebarSection from 'components/SidebarSection';
import SidebarSectionHeader from 'components/SidebarSectionHeader';
import SidebarSectionBody from 'components/SidebarSectionBody';

import styles from 'styles/pages/Post.module.scss';

export default function Post({ post, anchors, related }) {
  const { metadata } = useSite();
  const { title: siteTitle } = metadata;

  const {
    author,
    categories,
    content,
    date,
    demorepourl,
    demostarterurl,
    demowebsiteurl,
    excerpt,
    featuredImage,
    intro,
    isSticky = false,
    modified,
    ogImage,
    title,
    video,
  } = post;

  const metadataOptions = {
    compactCategories: false,
  };

  const metaDescription = `Read ${title} at ${siteTitle}.`;

  const { loaded: pageIsLoaded } = useOnLoad();

  const { ref: videoContainerRef, inView, entry } = useInView();

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:width" content="2024" />
        <meta property="og:image:height" content="1012" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={ogImage} />
      </Helmet>

      <Header className={styles.postHeader}>
        <h1
          className={styles.title}
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />
        <Metadata
          className={styles.postMetadata}
          date={date}
          author={author}
          categories={categories}
          options={metadataOptions}
          isSticky={isSticky}
        />
      </Header>

      <Content>
        <Section className={styles.postSection}>
          <Container className={styles.postContainer}>
            <div className={styles.postContent}>
              {intro && (
                <div
                  className={styles.postIntro}
                  dangerouslySetInnerHTML={{
                    __html: intro,
                  }}
                />
              )}
              {Array.isArray(anchors) && (
                <Anchors className={styles.postAnchors} anchors={anchors} headline="What's Inside 🧐" />
              )}
              {video && (
                <div ref={videoContainerRef}>
                  <Video className={styles.postVideo} {...video} title={`Video for ${title}`} isActive={inView} />
                </div>
              )}

              <div
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />

              <div className={styles.postFooter}>
                <p className={styles.postModified}>Last updated on {formatDate(modified)}.</p>
              </div>
            </div>
            <Sidebar>
              {featuredImage && (
                <FeaturedImage
                  {...featuredImage}
                  src={featuredImage.sourceUrl}
                  dangerouslySetInnerHTML={featuredImage.caption}
                />
              )}
              {(demowebsiteurl || demorepourl) && (
                <SidebarSection>
                  <SidebarSectionHeader>Demo</SidebarSectionHeader>
                  <SidebarSectionBody>
                    <p>
                      {demowebsiteurl && (
                        <Button href={demowebsiteurl} display="full">
                          View Demo Website
                        </Button>
                      )}
                      {demorepourl && (
                        <Button href={demorepourl} display="full">
                          See the Code
                        </Button>
                      )}
                    </p>
                  </SidebarSectionBody>
                </SidebarSection>
              )}
              {demowebsiteurl && (
                <SidebarSection>
                  <SidebarSectionHeader>Starter</SidebarSectionHeader>
                  <SidebarSectionBody>
                    <p>
                      <Button href={demowebsiteurl} display="full">
                        Go to Repository
                      </Button>
                    </p>
                  </SidebarSectionBody>
                </SidebarSection>
              )}
            </Sidebar>
          </Container>
        </Section>

        <Section className={styles.postRelated}>
          <Container>
            <h2>
              More from{' '}
              <strong>
                <Link href={categoryPathBySlug(related.slug)}>
                  <a>{related.name}</a>
                </Link>
              </strong>
            </h2>
            <Posts className={styles.postRelatedPosts} posts={related?.posts} />
          </Container>
        </Section>
      </Content>

      <ArticleJsonLd post={post} siteTitle={siteTitle} />
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { post } = await getPostBySlug(params?.slug);
  const { cardtitle, title, categories } = post;
  let { content } = post;

  const relatedCategory = categories[0];
  const related = await getPostsByCategoryId(relatedCategory?.categoryId, {
    queryIncludes: 'index',
  });
  const relatedPosts = related?.posts.filter(({ slug }) => slug !== params?.slug).slice(0, 3);

  // Parse the HTML and add IDs to all of the
  // h2 headers

  content = addIdsToHeadersHtml({
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

  // Build a custom OG image based on the title
  // and the categories

  const ogImage = getSpaceJellyOgPostUrl({
    headline: cardtitle || title,
    subtext: categories
      .slice(0, 3)
      .map(({ name }) => name)
      .join('     '),
  });

  if (post.video) {
    let oembed, thumbnail;

    if (post.video.includes('youtube.com')) {
      oembed = await fetch(`https://www.youtube.com/oembed?url=${post.video}`).then((r) => r.json());

      const { thumbnail_url } = oembed;
      const maxResUrl = thumbnail_url.replace('hqdefault', 'maxresdefault');

      const maxResExists = await fetch(maxResUrl, { method: 'HEAD' }).then((r) => r.ok);

      thumbnail = maxResExists ? maxResUrl : thumbnail_url;
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
        ogImage,
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
  const routes = {};

  const { posts } = await getAllPosts({
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
    fallback: false,
  };
}
