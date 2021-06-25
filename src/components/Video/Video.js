import { getUrlParamsFromString } from 'lib/parse';
import ClassName from 'models/classname';

import styles from './Video.module.scss';

export const Video = ({ className, title, url, width = 560, height = 315 }) => {
  const videoClassName = new ClassName(styles.video);

  videoClassName.addIf(className, className);

  const videoId = getUrlParamsFromString(url).find(({ key }) => key === 'v')?.value;

  return (
    <figure className={videoClassName.toString()}>
      <div
        className={styles.videoContainer}
        style={{
          paddingTop: `${(height / width) * 100}%`,
        }}
      >
        <iframe
          title={title}
          width={width}
          height={height}
          src={`https://www.youtube.com/embed/${videoId}?feature=oembed`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </figure>
  );
};

export default Video;
