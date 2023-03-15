import { getPageById, getAllPages } from 'lib/pages';
import { WebpageJsonLd } from 'lib/json-ld';
import useSite from 'hooks/use-site';

import Layout from 'components/Layout';
import Head from 'components/Head';
import Header from 'components/Header';
import Content from 'components/Content';
import Section from 'components/Section';
import Container from 'components/Container';
import FeaturedImage from 'components/FeaturedImage';

import styles from 'styles/pages/Page.module.scss';

export default function Page({ page }) {
  const { metadata = {} } = useSite();
  const { title: siteTitle } = metadata;

  const { title, content, featuredImage, slug } = page;

  const metaDescription = `${title} on ${siteTitle}`;

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

      <Header className={styles.pageHeader}>
        {featuredImage && (
          <>
            <FeaturedImage
              width={featuredImage.mediaDetails.width}
              height={featuredImage.mediaDetails.height}
              src={featuredImage.sourceUrl}
              altText=""
              dangerouslySetInnerHTML={featuredImage.caption}
            />
            <h1 className="sr-only">{title}</h1>
          </>
        )}
        {!featuredImage && <h1>{title}</h1>}
      </Header>

      <Content>
        <Section className={styles.pageSection}>
          <Container size="content">
            <div
              className={styles.pageContent}
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </Container>
        </Section>
      </Content>

      <WebpageJsonLd title={title} description={metaDescription} siteTitle={siteTitle} slug={slug} />
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}, ...rest) {
  const { pages } = await getAllPages();

  const id = pages.find(({ slug }) => slug === params.slug)?.id;

  if (!id) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { page } = await getPageById(id);

  return {
    props: {
      page,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
