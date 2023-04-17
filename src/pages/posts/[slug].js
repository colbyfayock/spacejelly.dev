import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

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
import Metadata from 'components/Metadata';
import Button from 'components/Button';
import Anchors from 'components/Anchors';
import Video from 'components/Video';
import Posts from 'components/Posts';

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
  } = post;

  const metadataOptions = {
    compactCategories: false,
  };

  const metaDescription = `Read ${title} at ${siteTitle}.`;

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

      <Header className={styles.postHeader} container={{ size: 'narrow' }}>
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
          tags={tags}
          options={metadataOptions}
          isSticky={isSticky}
        />
      </Header>

      <Content>
        <Section className={styles.introSection}>
          <Container size="content">
            {intro && (
              <div
                className={styles.postIntro}
                dangerouslySetInnerHTML={{
                  __html: intro,
                }}
              />
            )}
            {Array.isArray(anchors) && (
              <Anchors className={styles.postAnchors} anchors={anchors} headline="What's Inside" />
            )}
            {video && (
              <div ref={videoContainerRef}>
                <Video className={styles.postVideo} {...video} title={`Video for ${title}`} isActive={inView} />
              </div>
            )}
            <ul className={styles.postResources}>
              <li>
                {demowebsiteurl && (
                  <Button href={demowebsiteurl} display="full">
                    View Demo Website
                  </Button>
                )}
              </li>
              <li>
                {demorepourl && (
                  <Button href={demorepourl} display="full">
                    See the Code
                  </Button>
                )}
              </li>
              <li>
                {demostarterurl && (
                  <Button href={demostarterurl} display="full">
                    Grab the Starter
                  </Button>
                )}
              </li>
            </ul>
          </Container>
        </Section>

        <Content>
          <Section className={styles.contentSection}>
            <Container size="content">
              <div
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />

              <div className={styles.postFooter}>
                <p className={styles.postModified}>Last updated on {formatDate(modified)}.</p>
              </div>
            </Container>
          </Section>
        </Content>

        <Section className={styles.relatedSection}>
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
        </Section>
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
