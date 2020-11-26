import { useRouter } from 'next/router';
import { FaShoppingCart } from 'react-icons/fa';

import useSite from 'hooks/use-site';

import Section from 'components/Section';
import Container from 'components/Container';

import styles from './Nav.module.scss';

const Nav = () => {
  const { pathname } = useRouter();

  const isHome = pathname === '/';

  const { metadata = {} } = useSite();
  const { siteName } = metadata;

  return (
    <nav className={styles.nav}>
      <Section className={styles.navSection}>
        <Container className={styles.navContainer}>
          <div className={styles.navLogo}>
            {isHome && (
              <a href="/">
                <h1>{ siteName }</h1>
              </a>
            )}
            {!isHome && (
              <a href="/">{ siteName }</a>
            )}
          </div>

          <p className={styles.navCart}>
            <a className={`${styles.navCartLink} snipcart-checkout snipcart-summary`} href="#" style={{textDecoration: "none"}}>
              <FaShoppingCart aria-label="Shopping Cart" /> <span className="snipcart-total-price">$0.00</span>
              <span className={styles.navCheckOut}>Check Out</span>
            </a>
            <span className={styles.navCartShipping}>
              + $2 Flat Rate Shipping
              <br />
              <a href="https://www.usps.com/international/first-class-mail-international.htm" target="_blank" rel="noopener">
                via USPS Standard / Global Mail
              </a>
            </span>
          </p>
        </Container>
      </Section>
    </nav>
  )
}

export default Nav;