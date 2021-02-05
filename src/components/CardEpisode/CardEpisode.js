import Link from 'next/link';

import { formatDate, formatDateToIso, offsetDatetimeToTimezone, dateIsPast, dateIsFuture } from 'lib/datetime';

import Image from 'components/Image';

import styles from './CardEpisode.module.scss';

const CardEpisode = ({ id, title, name, date, featuredImage, youtube }) => {
  const datetimeOffset = 1000 * 60 * 60 * 1.5;

  const easternOffset = offsetDatetimeToTimezone(date, 'America/New_York');
  const pacificOffset = offsetDatetimeToTimezone(date, 'America/Los_Angeles');
  const centralEuropeanOffest = offsetDatetimeToTimezone(date, 'Europe/Berlin');

  const datetimeStartIso = formatDateToIso(date);
  const datetimeEndIso = formatDateToIso(new Date(date).getTime() + datetimeOffset);

  const calendarLink = `https://calendar.google.com/calendar/u/0/r/eventedit?dates=${datetimeStartIso}/${datetimeEndIso}&text=Colbyashi+Maru:+${encodeURIComponent(
    title
  )}&location=https://www.twitch.tv/colbyfayock&details=Join+${encodeURIComponent(
    name
  )}+as+they+take+on+the+Colbyashi+Maru.%0A%0AThey%27ll+face+off+with:+${encodeURIComponent(
    title
  )}%0A%0AHosted+by+Colby+Fayock%0A%0Ahttps://www.twitch.tv/colbyfayock&sf=true`;

  return (
    <div className={styles.episode}>
      <Image
        className={styles.episodeImage}
        {...featuredImage}
        src={featuredImage.sourceUrl}
        dangerouslySetInnerHTML={featuredImage.caption}
      />
      <div className={styles.episodeMeta}>
        <h3 className={styles.episodeTitle}>{title}</h3>
        <p className={styles.episodeDatePrimary}>
          {formatDate(easternOffset, 'P')} {formatDate(easternOffset, 'p')} EST
        </p>
        <p className={styles.episodeDateSecondary}>
          {formatDate(pacificOffset, 'p')} PST / {formatDate(centralEuropeanOffest, 'p')} CEST
        </p>
        {dateIsPast(date, datetimeOffset) && youtube && (
          <p className={styles.episodeAction}>
            <Link href={youtube}>
              <a target="_blank">Watch on YouTube</a>
            </Link>
          </p>
        )}
        {dateIsFuture(date, datetimeOffset) && (
          <p className={styles.episodeAction}>
            <a href={calendarLink} target="_blank">
              Add to Google Calendar
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default CardEpisode;
