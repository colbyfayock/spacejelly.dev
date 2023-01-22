import Link from 'next/link';

import useSite from 'hooks/use-site';
import { getAllTags } from 'lib/tags';
import { WebpageJsonLd } from 'lib/json-ld';

import Head from 'components/Head';
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
