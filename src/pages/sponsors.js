import { getPageById } from 'lib/pages';
import { WebpageJsonLd } from 'lib/json-ld';
import useSite from 'hooks/use-site';

import Head from 'components/Head';
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
        {!featuredImage && <h1 className={styles.title}>{title}</h1>}
      </Header>

      <Content>
        <Section className={styles.pageSection}>
          <Container className={styles.pageContainer} size="narrow">
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
