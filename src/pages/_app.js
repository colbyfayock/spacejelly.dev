import path from 'path';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Source_Sans_Pro } from '@next/font/google';

import SiteContext from 'context/site-context';
import { getSiteMetadata } from 'lib/site';
import { getAllCategories } from 'lib/categories';
import { getUserBySlug } from 'lib/users';
import { pageview } from 'lib/gtag';

import pkg from '../../package.json';
import 'styles/globals.scss';

const sourceSansPro = Source_Sans_Pro({
  weight: ['400', '600', '700', '900'],
  style: ['normal'],
  subsets: ['latin'],
});

function App({ Component, pageProps = {}, metadata, author, categories }) {
  const { asPath, events } = useRouter();
  const { homepage = '' } = pkg;

  const context = {
    metadata,
    author,
    categories,
    homepage,
  };

  const { title: siteTitle } = metadata;

  useEffect(() => {
    events.on('routeChangeComplete', pageview);
    return () => {
      events.off('routeChangeComplete', pageview);
    };
  }, [events]);

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteTitle} />
        <meta property="twitter:site" content={path.join(homepage, asPath)} />
        <meta property="twitter:creator" content="@colbyfayock" />
      </Head>

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
