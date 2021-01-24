import ClassName from 'models/classname';

import Section from 'components/Section';
import Container from 'components/Container';

import styles from './Banner.module.scss';

const Banner = ({ children, className }) => {
  const bannerClassName = new ClassName(styles.banner);

  bannerClassName.addIf(className, className);

  return (
    <Section className={bannerClassName.toString()}>
      <Container>{children}</Container>
    </Section>
  );
};

export default Banner;
