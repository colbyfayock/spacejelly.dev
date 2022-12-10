import { Helmet } from 'react-helmet';
import Link from 'next/link';

import { getRouteByName } from 'lib/routes';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Content from 'components/Content';
import Section from 'components/Section';
import Container from 'components/Container';
import CosmoShrug from 'components/CosmoShrug';

import styles from 'styles/pages/Page.module.scss';

export default function Store({ courses }) {
  const title = 'Something went wrong!';
  const metaDescription = 'Nothing to see here...';

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
      </Helmet>

      <Header className={styles.header}>
        <h1>{title}</h1>
      </Header>

      <Content>
        <Section className={styles.pageSection}>
          <Container className={styles.pageContent}>
            <p className="text-center">
              <CosmoShrug />
            </p>
            <p className="text-center">Uh oh, you hit a snag. 🙈</p>
            <p className="text-center">
              If you refresh and still see this, feel free to let me know{' '}
              <a href="https://twitter.com/colbyfayock">on Twitter</a> or email me at{' '}
              <a href="mailto:cosmo@spacejelly.dev">cosmo@spacejelly.dev</a>.
            </p>
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
