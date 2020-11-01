import 'styles/globals.scss';

import siteConfig from '../../site.config';

import useSite from 'hooks/use-site';
import SiteContext from 'context/site-context';

const context = {
  metadata: siteConfig
}

function App({ Component, pageProps }) {
  return (
    <SiteContext.Provider value={context}>
      <Component {...pageProps} />
    </SiteContext.Provider>
  );
}

export default App;