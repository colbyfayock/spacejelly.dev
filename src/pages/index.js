import { Helmet } from 'react-helmet';
import styles from 'styles/App.module.scss';

import useSite from 'hooks/use-site';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import Button from 'components/Button';
import FeatureList from 'components/FeatureList';

export default function Home() {
  const { metadata } = useSite();
  const { siteName } = metadata;

  return (
    <Layout displayNav={false}>

      <Helmet>
        <title>{ siteName }</title>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <Section>
        <Container>
          <h1 className={styles.homeTitle}>
            { siteName }
          </h1>

          <p>
            Get started by editing{' '}
            <code>pages/index.js</code>
          </p>

          <p>
            <Button>Buy Now</Button>
          </p>
        </Container>
      </Section>

      <FeatureList features={[
        '🤔 What is it?',
        '💪 What makes it so awesome?',
        '😢 What isn\'t it great at?'
      ]} />

    </Layout>
  )
}
