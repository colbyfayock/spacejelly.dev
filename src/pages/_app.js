import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { UniformTracker } from '@uniformdev/optimize-tracker-react';
import { createDefaultTracker } from '@uniformdev/optimize-tracker-browser';
import intentManifest from '../lib/intentManifest.json';

import SiteContext from 'context/site-context';
import { getSiteMetadata } from 'lib/site';
import { getRecentPosts } from 'lib/posts';
import { getNavigationPages } from 'lib/pages';
import { getCategories } from 'lib/categories';
import { pageview } from 'lib/gtag';

import 'styles/globals.scss';

const localTracker = createDefaultTracker({
  intentManifest,
});

function App({ Component, pageProps = {}, metadata, navigation, recentPosts, categories, scoring }) {
  const router = useRouter();

  const context = {
    metadata,
    navigation,
    recentPosts,
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
    <UniformTracker trackerInstance={localTracker} initialIntentScores={scoring}>
      <SiteContext.Provider value={context}>
        <Component {...pageProps} />
      </SiteContext.Provider>
    </UniformTracker>
  );
}

App.getInitialProps = async function () {
  const { posts: recentPosts } = await getRecentPosts({
    count: 5,
  });

  const { categories } = await getCategories({
    count: 5,
  });

  return {
    metadata: await getSiteMetadata(),
    navigation: await getNavigationPages(),
    recentPosts,
    categories,
  };
};

export default App;
