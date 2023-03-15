import Link from 'next/link';
import { FaMapPin } from 'react-icons/fa';

import { categoryPathBySlug, EXCLUDED_CATEGORIES } from 'lib/categories';
import { authorPathByName } from 'lib/users';
import { formatDate } from 'lib/datetime';
import ClassName from 'models/classname';

import styles from './Metadata.module.scss';

const Metadata = ({ className, author, date, categories, isSticky = false }) => {
  const metadataClassName = new ClassName(styles.metadata);

  metadataClassName.addIf(className, className);

  return (
    <ul className={metadataClassName.toString()}>
      {author && (
        <li className={styles.metadataAuthor}>
          <address>
            <img
              width={author.avatar.width}
              height={author.avatar.height}
              src={author.avatar.url}
              alt="Author Avatar"
            />
            By{' '}
            <Link href={authorPathByName(author.name)} rel="author">
              {author.name}
            </Link>
          </address>
        </li>
      )}
      {date && (
        <li>
          <time pubdate="pubdate" dateTime={date}>
            {formatDate(date)}
          </time>
        </li>
      )}
      {Array.isArray(categories) && categories[0] && (
        <li className={styles.metadataCategories}>
          <ul>
            {categories
              .filter(({ slug }) => !EXCLUDED_CATEGORIES.includes(slug))
              .map((category) => {
                return (
                  <li key={category.slug}>
                    <Link href={categoryPathBySlug(category.slug)}>{category.name}</Link>
                  </li>
                );
              })}
          </ul>
        </li>
      )}
      {isSticky && (
        <li className={styles.metadataSticky}>
          <FaMapPin aria-label="Sticky Post" />
        </li>
      )}
    </ul>
  );
};

export default Metadata;
