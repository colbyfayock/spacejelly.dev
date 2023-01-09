import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Source_Sans_Pro } from '@next/font/google';

const sourceSansPro = Source_Sans_Pro({
  weight: ['400', '600', '700', '900'],
  style: ['normal'],
  subsets: ['latin'],
});

import SiteContext from 'context/site-context';
import { getSiteMetadata } from 'lib/site';
import { getAllCategories } from 'lib/categories';
import { getUserBySlug } from 'lib/users';
import { pageview } from 'lib/gtag';

import 'styles/globals.scss';

function App({ Component, pageProps = {}, metadata, author, categories }) {
  const router = useRouter();

  const context = {
    metadata,
    author,
    categories,
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
    <>
      <style jsx global>{`
        html {
          font-family: ${sourceSansPro.style.fontFamily};
        }
      `}</style>
      <SiteContext.Provider value={context}>
        <Component {...pageProps} />
      </SiteContext.Provider>
    </>
  );
}

App.getInitialProps = async function () {
  const metadata = await getSiteMetadata();
  const { user: author } = await getUserBySlug('colby');
  const { categories } = await getAllCategories();

  return {
    metadata,
    author,
    categories,
  };
};

export default App;
