import Link from 'next/link';
import { Helmet } from 'react-helmet';

import useSite from 'hooks/use-site';
import { getAllTags } from 'lib/tags';
import { getSpaceJellyOgPageUrl } from 'lib/cloudinary';
import { WebpageJsonLd } from 'lib/json-ld';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';

import styles from 'styles/pages/Tags.module.scss';

export default function Tags({ tags }) {
  const { metadata = {} } = useSite();
  const { title: siteTitle } = metadata;
  const title = 'Tags';
  const slug = 'tags';
  let metaDescription = `Read ${tags.length} tags at ${siteTitle}.`;

  const ogImage = getSpaceJellyOgPageUrl({
    headline: title,
  });

  return (
    <Layout>
      <Helmet>
        <title>Tags</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:width" content="2024" />
        <meta property="og:image:height" content="1012" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={ogImage} />
      </Helmet>

      <WebpageJsonLd title={title} description={metaDescription} siteTitle={siteTitle} slug={slug} />

      <Header>
        <Container>
          <h1>Tags</h1>
        </Container>
      </Header>

      <Section>
        <Container>
          <SectionTitle>All Tags</SectionTitle>
          <ul className={styles.tags}>
            {tags.map((tag) => {
              return (
                <li key={tag.slug}>
                  <Link href={tag.uri}>{tag.name}</Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  const { tags } = await getAllTags();

  return {
    props: {
      tags,
    },
  };
}
