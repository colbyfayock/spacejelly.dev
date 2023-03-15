import ClassName from 'models/classname';

import styles from './Heading.module.scss';

const Heading = ({ children, className, as: Component = 'h1', color, action }) => {
  const headingClassName = new ClassName(styles.heading);

  headingClassName.addIf(className, className);

  return (
    <span className={headingClassName.toString()} data-color={color}>
      <Component className={styles.headingComponent}>{children}</Component>
      {action && (
        <span className={styles.headingAction}>
          <a href={action.link}>{action.title}</a>
        </span>
      )}
    </span>
  );
};

export default Heading;
