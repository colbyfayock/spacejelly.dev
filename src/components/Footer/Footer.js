import Link from 'next/link';
import { FaTwitter, FaYoutube, FaGithub } from 'react-icons/fa';

import useSite from 'hooks/use-site';
import { getRouteByName } from 'lib/routes';
import { authorPathByName } from 'lib/users';

import Section from 'components/Section';
import Container from 'components/Container';
import FormSubscribe from 'components/FormSubscribe';
import LogoWPEngine from 'components/LogoWPEngine';
import Heading from 'components/Heading';
import Sand from 'components/Sand';
import SandSpaceship from 'components/SandSpaceship';

import styles from './Footer.module.scss';

const Footer = () => {
  const { metadata = {}, author = {} } = useSite();
  const { title } = metadata;

  return (
    <footer className={styles.footer}>
      <Sand className={styles.footerSand} />
      <SandSpaceship className={styles.footerSandSpaceship} />
      <Section className={styles.footerSection}>
        <Container>
          <Heading className={styles.heading} as="h3">
            Who's behind the tentacles?
          </Heading>
          <div className={styles.footerAuthorInfo}>
            <div className={styles.footerAuthorImage}>
              <img
                width={author.user.userimage.mediaDetails.width}
                height={author.user.userimage.mediaDetails.height}
                src={author.user.userimage.sourceUrl}
                alt="Author"
              />
            </div>
            <div>
              <p className={styles.footerAuthorName}>{author.name}</p>
              <ul className={styles.footerAuthorSocial}>
                <li>
                  <a href={author.seo.social.twitter}>
                    <FaTwitter />
                    <span className="sr-only">Twitter</span>
                  </a>
                </li>
                <li>
                  <a href={author.seo.social.youTube}>
                    <FaYoutube />
                    <span className="sr-only">YouTube</span>
                  </a>
                </li>
                <li>
                  <a href={author.user.githuburl}>
                    <FaGithub />
                    <span className="sr-only">GitHub</span>
                  </a>
                </li>
              </ul>
              <p className={styles.footerAuthorMore}>
                <a href={authorPathByName(author.name)}>More about {author.name}</a>
              </p>
            </div>
          </div>
        </Container>
      </Section>
      <Section className={`${styles.footerSection} ${styles.footerSignup}`}>
        <Container>
          <Heading className={styles.heading} as="h3">
            Get free tutorials and web dev resources straight to your inbox!
          </Heading>
          <FormSubscribe />
        </Container>
      </Section>

      <Section className={`${styles.footerSection} ${styles.footerPoweredBy}`}>
        <Container>
          <p>
            WordPress hosting provided by
            <a className={styles.footerWPEngine} href="https://wpengine.com/">
              <LogoWPEngine />
              <span className="sr-only">WP Engine</span>
            </a>
          </p>
        </Container>
      </Section>

      <Section className={`${styles.footerSection} ${styles.footerAnchor}`}>
        <Container>
          <p>
            &copy; {new Date().getFullYear()} {title}, <a href="https://twitter.com/colbyfayock">Colby Fayock</a>
          </p>
          <ul className={styles.footerAnchorLinks}>
            <li>
              <a href={getRouteByName('sitemap')?.path}>Sitemap</a>
            </li>
            <li>
              <a href={getRouteByName('rss')?.path}>RSS</a>
            </li>
            <li>
              <a href={getRouteByName('about')?.path}>About</a>
            </li>
            <li>
              <Link href={getRouteByName('colbyashiMaru')?.path}>Colbyashi Maru</Link>
            </li>
          </ul>
        </Container>
      </Section>
    </footer>
  );
};

export default Footer;
