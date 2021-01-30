import path from 'path';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import styles from './Layout.module.scss';

import { getSpaceJellyOgHomeUrl } from 'lib/cloudinary';
import useSite from 'hooks/use-site';

import Nav from 'components/Nav';
import Main from 'components/Main';
import Footer from 'components/Footer';
import Banner from 'components/Banner';

const Layout = ({ children }) => {
  const { asPath, query = {} } = useRouter();

  const isEmailSignupConfirm = query.emailSignup === 'confirm';
  const isEmailSignupSuccess = query.emailSignup === 'success';

  const { homepage, metadata = {} } = useSite();
  const { title, language, description } = metadata;

  const ogImage = getSpaceJellyOgHomeUrl();

  const helmetSettings = {
    defaultTitle: title,
    titleTemplate: `%s - ${title}`,
  };

  const metaDescription = `${description} at ${title}`;

  return (
    <div className={styles.layoutContainer}>
      <Helmet {...helmetSettings}>
        <html lang={language} />

        <meta name="description" content={metaDescription} />

        {/* Favicon sizes and manifest generated via https://favicon.io/ */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={path.join(homepage, asPath)} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={title} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:width" content="2024" />
        <meta property="og:image:height" content="1012" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={ogImage} />
        <meta property="twitter:site" content={path.join(homepage, asPath)} />
        <meta property="twitter:creator" content="@colbyfayock" />
      </Helmet>

      {isEmailSignupConfirm && <Banner>Thanks for signing up! Check your email inbox to confirm 📬</Banner>}

      {isEmailSignupSuccess && <Banner>Confirmed! 😎 Look for an email next Sunday</Banner>}

      <Nav />

      <Main>{children}</Main>

      <Footer />
    </div>
  );
};

export default Layout;
