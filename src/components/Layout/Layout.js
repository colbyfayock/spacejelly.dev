import { useRouter } from 'next/router';
import styles from './Layout.module.scss';

import Nav from 'components/Nav';
import Main from 'components/Main';
import Footer from 'components/Footer';
import Banner from 'components/Banner';
import Stars from 'components/Stars';

const Layout = ({ children }) => {
  const { query = {}, pathname } = useRouter();

  const isEmailSignupConfirm = query.emailSignup === 'confirm';
  const isEmailSignupSuccess = query.emailSignup === 'success';

  return (
    <div
      className={styles.layoutContainer}
      style={
        pathname === '/'
          ? {
              // @halloween
              background: '#027DC1',
            }
          : {}
      }
    >
      {isEmailSignupConfirm && <Banner>Thanks for signing up! Check your email inbox to confirm 📬</Banner>}

      {isEmailSignupSuccess && <Banner>Confirmed! 😎 Look for an email next Sunday</Banner>}

      <Nav />

      <Main>{children}</Main>

      {/** @halloween */}
      {pathname !== '/' && <Stars className={styles.stars} />}

      {/** @halloween */}
      {pathname === '/' && <div className={styles.gradient} />}

      <Footer />
    </div>
  );
};

export default Layout;
