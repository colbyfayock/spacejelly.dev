import Link from 'next/link';

import useSite from 'hooks/use-site';
import { getAllCategories, categoryPathBySlug } from 'lib/categories';
import { getSpaceJellyOgPageUrl } from 'lib/cloudinary';
import { WebpageJsonLd } from 'lib/json-ld';

import Head from 'components/Head';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';

import styles from 'styles/pages/Categories.module.scss';

export default function Categories({ categories }) {
  const { metadata = {} } = useSite();
  const { title: siteTitle } = metadata;
  const title = 'Categories';
  const slug = 'categories';
  let metaDescription = `Read ${categories.length} categories at ${siteTitle}.`;

  const ogImage = getSpaceJellyOgPageUrl({
    headline: title,
  });

  return (
    <Layout>
      <Head>
        <title>Categories</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:width" content="2024" />
        <meta property="og:image:height" content="1012" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={ogImage} />
      </Head>

      <WebpageJsonLd title={title} description={metaDescription} siteTitle={siteTitle} slug={slug} />

      <Header>
        <Container>
          <h1>Categories</h1>
        </Container>
      </Header>

      <Section>
        <Container>
          <SectionTitle>All Categories</SectionTitle>
          <ul className={styles.categories}>
            {categories.map((category) => {
              return (
                <li key={category.slug}>
                  <Link href={categoryPathBySlug(category.slug)}>{category.name}</Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { categories } = await getAllCategories();

  return {
    props: {
      categories,
    },
  };
}
