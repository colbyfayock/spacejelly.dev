import { FaTwitch, FaCalendarCheck } from 'react-icons/fa';

import { getAllCmEpisodes } from 'lib/colbyashi-maru';
import { WebsiteJsonLd } from 'lib/json-ld';
import { sortObjectsByDate, dateIsPast, dateIsFuture } from 'lib/datetime';

import Head from 'components/Head';
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

  const episodesPast = episodesSorted.filter((episode) => dateIsPast(episode.date));
  const episodesFuture = episodesSorted.filter((episode) => dateIsFuture(episode.date, datetimeOffset)).reverse();

  return (
    <Layout>
      <Head
        title={title}
        description={metaDescription}
        ogImage={{
          title,
          layout: 'colbyashi-maru',
        }}
      />

      <Header className={styles.header}>
        <h1>{title}</h1>
        <p>Boldy facing off against the most logical tools on the web.</p>
        <ul>
          <li>
            <a href="https://twitch.tv/colbyfayock" target="_blank" rel="noopener">
              <FaTwitch /> Follow on Twitch
            </a>
          </li>
          <li>
            <a
              href="https://calendar.google.com/calendar?cid=Y19jY2NzcGRkNGtrbW0xN2doajRoNmNyYnQ3c0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
              target="_blank"
              rel="noopener"
            >
              <FaCalendarCheck /> Add to Google Calendar
            </a>
          </li>
        </ul>
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
            {episodesPast.map((episode) => {
              return (
                <li key={episode.id}>
                  <CardEpisode {...episode} />
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section className={styles.notes}>
        <Container>
          <h2>Want to see someone on Colbyashi Maru?</h2>
          <p>
            Reach out on <a href="https://discord.com/invite/FYQX5Vs">Discord</a> or email me at hello@colbyfayock.com
            and let me know your idea!
          </p>
        </Container>
      </Section>

      <WebsiteJsonLd siteTitle={title} />
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
