import CldImage from 'components/CldImage';
import ClassName from 'models/classname';

import styles from './Title.module.scss';

const Title = ({ className, title, thumbnail }) => {
  const titleClassName = new ClassName(styles.title);

  titleClassName.addIf(className, className);

  return (
    <div className={titleClassName.toString()}>
      {thumbnail && <CldImage src={thumbnail.url} width="150" height="150" alt="" />}
      <span>{title}</span>
    </div>
  );
};

export default Title;
