import Link from 'next/link';

import Head from 'components/Head';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Content from 'components/Content';
import Section from 'components/Section';
import Container from 'components/Container';
import CosmoShrug from 'components/CosmoShrug';

import styles from 'styles/pages/Page.module.scss';

export default function Page404() {
  const title = 'Not Found!';
  const metaDescription = 'Nothing to see here...';
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
      </Head>

      <Header className={styles.header}>
        <h1>{title}</h1>
      </Header>

      <Content>
        <Section className={styles.pageSection}>
          <Container className={styles.pageContent}>
            <p className="text-center">
              <CosmoShrug />
            </p>
            <p className="text-center">Not sure what you were looking for, but this isn't it!</p>
            <p className="text-center">
              <Link href="/">Go Back Home</Link>
            </p>
          </Container>
        </Section>
      </Content>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
