import useSite from 'hooks/use-site';

import Section from 'components/Section';

import styles from './Nav.module.scss';

const Nav = () => {
  const { metadata = {} } = useSite();
  const { siteName } = metadata;

  return (
    <nav className={styles.nav}>
      <Section>
        <div className={styles.container}>
          <a href="/">{ siteName }</a>
        </div>
      </Section>
    </nav>
  )
}

export default Nav;