import path from 'path';
import { Helmet } from 'react-helmet';

import { getPostBySlug, getAllPosts, parseIntroFromContent } from 'lib/posts';
import { formatDate } from 'lib/datetime';
import { ArticleJsonLd } from 'lib/json-ld';
import { getSpaceJellyOgPostUrl } from 'lib/cloudinary';
import { addIdsToHeadersHtml, getHeadersAnchorsFromHtml } from 'lib/parse';
import useSite from 'hooks/use-site';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';
import Metadata from 'components/Metadata';
import FeaturedImage from 'components/FeaturedImage';
import Anchors from 'components/Anchors';
import Video from 'components/Video';

import styles from 'styles/pages/Post.module.scss';

export default function Post({ post, anchors }) {
  const { metadata } = useSite();
  const { title: siteTitle } = metadata;

  const {
    author,
    categories,
    content,
    date,
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
          <Container>
            {featuredImage && (
              <FeaturedImage
                {...featuredImage}
                src={featuredImage.sourceUrl}
                dangerouslySetInnerHTML={featuredImage.caption}
              />
            )}
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
              {video && <Video className={styles.postVideo} url={video} title={`Video for ${title}`} />}
              <div
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
            </div>
          </Container>
        </Section>
      </Content>

      <Section className={styles.postFooter}>
        <Container>
          <p className={styles.postModified}>Last updated on {formatDate(modified)}.</p>
        </Container>
      </Section>

      <ArticleJsonLd post={post} siteTitle={siteTitle} />
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { post } = await getPostBySlug(params?.slug);
  const { cardtitle, title, categories } = post;
  let { content } = post;

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

  return {
    props: {
      post: {
        ...post,
        ogImage,
        content,
        intro,
      },
      anchors,
    },
  };
}

export async function getStaticPaths() {
  const routes = {};

  const { posts } = await getAllPosts();

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
