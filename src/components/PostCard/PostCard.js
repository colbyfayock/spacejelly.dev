import Link from 'next/link';

import ClassName from 'models/classname';
import { postPathBySlug, sanitizeExcerpt } from 'lib/posts';

import Metadata from 'components/Metadata';
import FeaturedImage from 'components/FeaturedImage';

import { FaMapPin } from 'react-icons/fa';
import styles from './PostCard.module.scss';

const PostCard = ({ post, options = {} }) => {
  const { id, title, excerpt, slug, date, author, categories, featuredImage, isSticky = false } = post;
  const { sourceUrl: featuredSourceUrl } = featuredImage || {};
  const { excludeMetadata = [] } = options;

  const metadata = {};

  if (!excludeMetadata.includes('author')) {
    metadata.author = author;
  }

  if (!excludeMetadata.includes('date')) {
    metadata.date = date;
  }

  if (!excludeMetadata.includes('categories')) {
    metadata.categories = categories;
  }

  let postCardStyle = styles.postCard;

  if (isSticky) {
    postCardStyle = `${postCardStyle} ${styles.postCardSticky}`;
  }

  return (
    <div className={postCardStyle}>
      {featuredSourceUrl && (
        <Link href={postPathBySlug(slug)} className={styles.postCardImage}>
          <span
            style={{
              backgroundImage: `url(${featuredSourceUrl})`,
            }}
          />
        </Link>
      )}
      {isSticky && <FaMapPin aria-label="Sticky Post" />}
      <Link href={postPathBySlug(slug)}>
        <h3
          className={styles.postCardTitle}
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />
      </Link>
      <Metadata className={styles.postCardMetadata} {...metadata} />
      {excerpt && (
        <div
          className={styles.postCardContent}
          dangerouslySetInnerHTML={{
            __html: sanitizeExcerpt(excerpt),
          }}
        />
      )}
    </div>
  );
};

export default PostCard;
