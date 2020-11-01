import { Helmet } from 'react-helmet';
import styles from './Layout.module.scss';

import useSite from 'hooks/use-site';

import Nav from 'components/Nav';
import Main from 'components/Main';
import Footer from 'components/Footer';

const Layout = ({ children, displayNav = true }) => {
  const { metadata = {} } = useSite();
  const { siteName, homepage } = metadata;

  const pageTitle = siteName;

  const helmetSettings = {
    defaultTitle: pageTitle,
    titleTemplate: `%s - ${pageTitle}`
  }

  return (
    <div className={styles.layoutContainer}>
      <Helmet {...helmetSettings}>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:url" content={homepage} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={pageTitle} />
      </Helmet>

      { displayNav && <Nav />}

      <Main>{ children }</Main>

      <Footer />
    </div>
  )
}

export default Layout;