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
        <CldImage width="50" height="50" crop="fill" src={author.avatar.url} alt="Author Avatar" />
        <Link href={authorPathByName(author.name)} rel="author">
          {author.name}
        </Link>
        <span>on</span>
        <time pubdate="pubdate" dateTime={date}>
          {formatDate(date)}
        </time>
      </p>
      <p className={styles.metadataBuckets}>
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
                <li key={tag.slug}>
                  <Link href={tag.uri}>{tag.name}</Link>
                </li>
              );
            })}
          </ul>
        </span>
      </p>
    </div>
  );
};

export default PostMetadata;
