import path from 'path';
import { Helmet } from 'react-helmet';

import { getPageById } from 'lib/pages';
import { WebpageJsonLd } from 'lib/json-ld';
import { getSpaceJellyOgPageUrl } from 'lib/cloudinary';
import useSite from 'hooks/use-site';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Content from 'components/Content';
import Section from 'components/Section';
import Container from 'components/Container';
import FeaturedImage from 'components/FeaturedImage';
import Sidebar from 'components/Sidebar';
import SidebarSection from 'components/SidebarSection';
import SidebarSectionHeader from 'components/SidebarSectionHeader';
import SidebarSectionBody from 'components/SidebarSectionBody';

import styles from 'styles/pages/Page.module.scss';

export default function Page({ page }) {
  const { metadata = {} } = useSite();
  const { title: siteTitle } = metadata;

  const { title, content, date, featuredImage, slug } = page;

  const pageTitle = title?.rendered;

  const metaDescription = `${title} on ${siteTitle}`;

  const ogImage = getSpaceJellyOgPageUrl({
    headline: title,
  });

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
        {!featuredImage && <h1 className={styles.title}>{title}</h1>}
      </Header>

      <Content>
        <Section className={styles.pageSection}>
          <Container className={styles.pageContainer}>
            <div
              className={styles.pageContent}
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
            <Sidebar>
              <SidebarSection>
                <SidebarSectionHeader>spacejelly.dev</SidebarSectionHeader>
                <SidebarSectionBody>
                  <p>
                    23k+ Unique Users per Month
                    <br />
                    29k+ Pageviews per Month
                  </p>
                  <p>
                    <em>As of December 2022.</em>
                  </p>
                </SidebarSectionBody>
              </SidebarSection>
              <SidebarSection>
                <SidebarSectionHeader>youtube.com/colbyfayock</SidebarSectionHeader>
                <SidebarSectionBody>
                  <p>
                    18.3k+ Subscribers
                    <br />
                    28k+ Unique Users per Month
                    <br />
                    42k+ Views per Month
                  </p>
                  <p>
                    <em>As of December 2022.</em>
                  </p>
                </SidebarSectionBody>
              </SidebarSection>
              <SidebarSection>
                <SidebarSectionHeader>twitter.com/colbyfayock</SidebarSectionHeader>
                <SidebarSectionBody>
                  <p>8.5k+ Subscribers</p>
                  <p>
                    <em>As of December 2022.</em>
                  </p>
                </SidebarSectionBody>
              </SidebarSection>
              <SidebarSection>
                <SidebarSectionHeader>Newsletter</SidebarSectionHeader>
                <SidebarSectionBody>
                  <p>7.5k+ Subscribers</p>
                  <p>
                    <em>As of December 2022.</em>
                  </p>
                </SidebarSectionBody>
              </SidebarSection>
            </Sidebar>
          </Container>
        </Section>
      </Content>

      <WebpageJsonLd title={title} description={metaDescription} siteTitle={siteTitle} slug={slug} />
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}, ...rest) {
  const { page } = await getPageById('cG9zdDoxNDYy');

  return {
    props: {
      page,
    },
  };
}
