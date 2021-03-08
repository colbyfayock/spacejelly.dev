import ClassName from 'models/classname';

import styles from './Anchors.module.scss';

export const Anchors = ({ className, anchors }) => {
  const anchorsClassName = new ClassName(styles.anchors);

  anchorsClassName.addIf(className, className);

  return (
    <ul className={anchorsClassName.toString()}>
      {anchors.map(({ anchor, title }) => {
        return (
          <li key={anchor}>
            <a href={`#${anchor}`}>{title}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default Anchors;
