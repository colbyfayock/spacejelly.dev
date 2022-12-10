import Link from 'next/link';

import useSite from 'hooks/use-site';
import { postPathBySlug } from 'lib/posts';
import { getRouteByName } from 'lib/routes';
import { categoryPathBySlug } from 'lib/categories';

import Section from 'components/Section';
import Container from 'components/Container';
import FormSubscribe from 'components/FormSubscribe';
import LogoWPEngine from 'components/LogoWPEngine';

import styles from './Footer.module.scss';

const Footer = () => {
  const { metadata = {}, recentPosts = [], categories = [] } = useSite();
  const { title } = metadata;

  const hasRecentPosts = Array.isArray(recentPosts) && recentPosts.length > 0;
  const hasRecentCategories = Array.isArray(categories) && categories.length > 0;
  const hasMenu = hasRecentPosts || hasRecentCategories;

  return (
    <footer className={styles.footer}>
      <Section className={styles.footerSignup}>
        <Container>
          <h3>Get free tutorials and web dev resources straight to your inbox!</h3>
          <FormSubscribe />
        </Container>
      </Section>
      {hasMenu && (
        <Section className={styles.footerMenu}>
          <Container>
            <ul className={styles.footerMenuColumns}>
              {hasRecentPosts && (
                <li>
                  <Link href="/posts/" className={styles.footerMenuTitle}>
                    <strong>Recent Posts</strong>
                  </Link>
                  <ul className={styles.footerMenuItems}>
                    {recentPosts.map((post) => {
                      const { id, slug, title } = post;
                      return (
                        <li key={id}>
                          <Link href={postPathBySlug(slug)}>{title}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              )}
              {hasRecentCategories && (
                <li>
                  <Link href="/categories/" className={styles.footerMenuTitle}>
                    <strong>Categories</strong>
                  </Link>
                  <ul className={styles.footerMenuItems}>
                    {categories.map((category) => {
                      const { id, slug, name } = category;
                      return (
                        <li key={id}>
                          <Link href={categoryPathBySlug(slug)}>{name}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              )}

              <li>
                <p className={styles.footerMenuTitle}>
                  <strong>Space Jelly</strong>
                </p>
                <ul className={styles.footerMenuItems}>
                  <li>
                    <Link href={getRouteByName('colbyashiMaru')?.path}>Colbyashi Maru</Link>
                  </li>
                  <li>
                    <a href={getRouteByName('sitemap')?.path}>Sitemap</a>
                  </li>
                </ul>
              </li>
            </ul>
          </Container>
        </Section>
      )}

      <Section className={styles.footerPoweredBy}>
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

      <Section className={styles.footerLegal}>
        <Container>
          <p>
            &copy; {new Date().getFullYear()} {title}, <a href="https://twitter.com/colbyfayock">Colby Fayock</a>
          </p>
        </Container>
      </Section>
    </footer>
  );
};

export default Footer;
