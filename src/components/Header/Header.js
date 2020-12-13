import ClassName from 'models/classname';

import Container from 'components/Container';

import styles from './Header.module.scss';

const Header = ({ children, className }) => {
  const headerClassName = new ClassName(styles.header);

  headerClassName.addIf(className, className);

  return (
    <header className={headerClassName.toString()}>
      <Container>{children}</Container>
    </header>
  );
};

export default Header;
