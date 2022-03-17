import { useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';

import { getUrlParamsFromString } from 'lib/parse';
import ClassName from 'models/classname';

import styles from './Video.module.scss';

export const Video = ({
  className,
  title,
  url,
  width = 560,
  height = 315,
  thumbnail,
  isActive: defaultIsActive = false,
}) => {
  const [isActive, setIsActive] = useState(defaultIsActive);

  useEffect(() => {
    if (isActive !== defaultIsActive) setIsActive(defaultIsActive);
  }, [defaultIsActive]);

  const videoClassName = new ClassName(styles.video);

  videoClassName.addIf(className, className);

  const videoId = getUrlParamsFromString(url).find(({ key }) => key === 'v')?.value;

  function handleOnActivateClick(e) {
    e.preventDefault();
    setIsActive(true);
  }

  return (
    <figure className={videoClassName.toString()}>
      <div
        className={styles.videoContainer}
        style={{
          paddingTop: `${(height / width) * 100}%`,
        }}
      >
        {isActive && (
          <iframe
            title={title}
            width={width}
            height={height}
            src={`https://www.youtube.com/embed/${videoId}?feature=oembed`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            autoPlay
          />
        )}
        {!isActive && (
          <div className={styles.videoPlay}>
            <img src={thumbnail.url} alt="" />
            <button className={styles.videoPlayButton} onClick={handleOnActivateClick}>
              <span className={styles.videoPlayAction}>
                <FaPlay />
                <span className="sr-only">Click to Play Video</span>
              </span>
            </button>
          </div>
        )}
      </div>
      <figcaption>
        <a href={url} rel="noopener">
          View on YouTube
        </a>
      </figcaption>
    </figure>
  );
};

export default Video;
