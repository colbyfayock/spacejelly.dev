import { Helmet } from 'react-helmet';
import { FaShoppingCart } from 'react-icons/fa';

import { getAllCmEpisodes } from 'lib/colbyashi-maru';
import { getRouteByName } from 'lib/routes';
import { WebsiteJsonLd } from 'lib/json-ld';
import { sortObjectsByDate, dateIsPast, dateIsFuture } from 'lib/datetime';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import CardEpisode from 'components/CardEpisode';

import styles from 'styles/pages/ColbyashiMaru.module.scss';

export default function ColbyashiMaru({ episodes }) {
  const title = 'Colbyashi Maru';
  const metaDescription = 'Challenging the web dev world.';

  const episodesSorted = sortObjectsByDate(episodes);

  const datetimeOffset = 1000 * 60 * 60 * 1.5;

  const episodesPast = episodesSorted.filter((episode) => dateIsPast(episode.date, datetimeOffset));
  const episodesFuture = episodesSorted.filter((episode) => dateIsFuture(episode.date, datetimeOffset));

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
      </Helmet>

      <WebsiteJsonLd siteTitle={title} />

      <Header>
        <h1>{title}</h1>
      </Header>

      <Section className={styles.section}>
        <Container>
          <h2 className={styles.sectionTitle}>Future Episodes</h2>
          <ul className={styles.episodes}>
            {episodesFuture.map((episode) => (
              <li key={episode.id}>
                <CardEpisode {...episode} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className={styles.section}>
        <Container>
          <h2 className={styles.sectionTitle}>Past Episodes</h2>
          <ul className={styles.episodes}>
            {episodesPast.map((episode) => (
              <li key={episode.id}>
                <CardEpisode {...episode} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className={styles.notes}>
        <Container>
          <h2>Want to be on Colbyashi Maru?</h2>
          <p>
            Reach out on <a href="https://discord.com/invite/FYQX5Vs">Discord</a> or email me at hello@colbyfayock.com
            and let me know your idea!
          </p>
        </Container>
      </Section>
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { episodes } = await getAllCmEpisodes();

  return {
    props: {
      episodes,
    },
  };
}
