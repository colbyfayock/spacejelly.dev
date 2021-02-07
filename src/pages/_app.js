import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ApolloProvider } from '@apollo/client';

import SiteContext from 'context/site-context';
import { getSiteMetadata } from 'lib/site';
import { getRecentPosts } from 'lib/posts';
import { getNavigationPages } from 'lib/pages';
import { getCategories } from 'lib/categories';
import { pageview } from 'lib/gtag';
import useApolloClient from 'hooks/use-apollo-client';

import 'styles/globals.scss';

function App({ Component, pageProps = {}, metadata, navigation, recentPosts, categories }) {
  const router = useRouter();
  const apolloClient = useApolloClient(pageProps.initialApolloState);

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
    <ApolloProvider client={apolloClient}>
      <SiteContext.Provider value={context}>
        <Component {...pageProps} />
      </SiteContext.Provider>
    </ApolloProvider>
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
