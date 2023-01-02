import { useEffect } from 'react';
import { useRouter } from 'next/router';

import SiteContext from 'context/site-context';
import { getSiteMetadata } from 'lib/site';
import { getUserBySlug } from 'lib/users';
import { pageview } from 'lib/gtag';

import 'styles/globals.scss';

function App({ Component, pageProps = {}, metadata, author }) {
  const router = useRouter();

  const context = {
    metadata,
    author,
  };

  /**
   * handleRouteChange
   */

  function handleRouteChange(url) {
    pageview(url);
  }

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <SiteContext.Provider value={context}>
      <Component {...pageProps} />
    </SiteContext.Provider>
  );
}

App.getInitialProps = async function () {
  const metadata = await getSiteMetadata();
  const { user: author } = await getUserBySlug('colby');

  return {
    metadata,
    author,
  };
};

export default App;
