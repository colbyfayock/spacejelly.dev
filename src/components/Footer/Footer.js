import { FaTwitter, FaGithub, FaYoutube } from 'react-icons/fa';

import useSite from 'hooks/use-site';

import Section from 'components/Section';
import Container from 'components/Container';
import Button from 'components/Button';
import CosmoMono from 'components/CosmoMono';

import styles from './Footer.module.scss';

const Footer = () => {
  const { metadata } = useSite();
  const { supportEmail, authorName, authorUrl } = metadata;

  return (
    <footer className={styles.footer}>
      <Section className={styles.footerSection}>
        <Container className={[styles.footerContainer, styles.footerContentContainer]}>
          <div>
            <h3>Have any questions?</h3>
            <p>
              Contact me at <a href={`mailto:${supportEmail}`}>{ supportEmail }</a>
            </p>
          </div>
          <div>
            <h3>Moar awesome!</h3>
            <ul>
              <li>
                <a href="https://colbyfayock.com">colbyfayock.com</a>
              </li>
            </ul>
          </div>
          <div className={styles.footerLegal}>
            <div>
              <p>
                &copy; { new Date().getFullYear() }, <a href={authorUrl}>{ authorName }</a>
              </p>
              <ul>
                <li>
                  <a href="https://twitter.com/colbyfayock">
                    <span className="sr-only">Twitter</span>
                    <FaTwitter />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/colbyfayock">
                    <span className="sr-only">GitHub</span>
                    <FaGithub />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/colbyfayock">
                    <span className="sr-only">YouTube</span>
                    <FaYoutube className={styles.footerIconYoutube} />
                  </a>
                </li>
              </ul>
            </div>
            <CosmoMono className={styles.footerCosmo} classNameStroke={styles.footerCosmoStroke} />
          </div>
        </Container>
      </Section>
    </footer>
  )
}

export default Footer;