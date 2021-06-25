import ClassName from 'models/classname';

import styles from './Anchors.module.scss';

export const Anchors = ({ className, anchors, headline }) => {
  const anchorsClassName = new ClassName(styles.anchors);

  anchorsClassName.addIf(className, className);

  return (
    <div className={anchorsClassName.toString()}>
      {headline && <p className={styles.anchorsHeadline}>{headline}</p>}
      <ul>
        {anchors.map(({ anchor, title }) => {
          return (
            <li key={anchor}>
              <a href={`#${anchor}`}>{title}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Anchors;
