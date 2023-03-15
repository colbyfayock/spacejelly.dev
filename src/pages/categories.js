import Link from 'next/link';

import useSite from 'hooks/use-site';
import { getAllCategories, categoryPathBySlug } from 'lib/categories';
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
