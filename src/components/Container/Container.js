import ClassName from 'models/classname';

import styles from './Container.module.scss';

const Container = ({ children, className, size = 'full' }) => {
  const containerClassName = new ClassName(styles.container);

  containerClassName.addIf(className, className);

  return (
    <div className={containerClassName.toString()} data-container-size={size}>
      {children}
    </div>
  );
};

export default Container;
