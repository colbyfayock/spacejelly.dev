import Link from 'next/link';

import { categoryPathBySlug, EXCLUDED_CATEGORIES } from 'lib/categories';
import { authorPathByName } from 'lib/users';
import { formatDate } from 'lib/datetime';
import ClassName from 'models/classname';

import CldImage from 'components/CldImage';

import styles from './PostMetadata.module.scss';

const PostMetadata = ({ className, author, date, categories, tags }) => {
  const metadataClassName = new ClassName(styles.postMetadata);

  metadataClassName.addIf(className, className);

  return (
    <div>
      <p className={styles.metadataByline}>
        <span className={styles.metadataAuthor}>
          <CldImage width="50" height="50" crop="fill" src={author.avatar.url} alt="Author Avatar" />
          <Link href={authorPathByName(author.name)} rel="author">
            {author.name}
          </Link>
        </span>
        <span className={styles.metadataDate}>
          <span>on</span>
          <time pubdate="pubdate" dateTime={date}>
            {formatDate(date)}
          </time>
        </span>
      </p>
      <div className={styles.metadataBuckets}>
        <span>
          <ul className={styles.metadataCategories}>
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
        </span>
        <span>
          <ul className={styles.metadataCategories}>
            {tags.map((tag) => {
              return (
                <li key={tag.uri}>
                  <Link href={tag.uri}>{tag.name}</Link>
                </li>
              );
            })}
          </ul>
        </span>
      </div>
    </div>
  );
};

export default PostMetadata;
