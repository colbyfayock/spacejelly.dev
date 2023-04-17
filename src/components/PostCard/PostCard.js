import Link from 'next/link';

import { postPathBySlug, sanitizeExcerpt } from 'lib/posts';

import Metadata from 'components/Metadata';

import styles from './PostCard.module.scss';

const PostCard = ({ post, options = {} }) => {
  const { title, excerpt, slug, date, author, categories, tags } = post;
  const { excludeMetadata = [], className } = options;

  const metadata = {};

  if (!excludeMetadata.includes('author') && author) {
    metadata.author = author;
  }

  if (!excludeMetadata.includes('date') && date) {
    metadata.date = date;
  }

  if (!excludeMetadata.includes('categories') && categories) {
    metadata.categories = categories;
  }

  if (!excludeMetadata.includes('tags') && tags) {
    metadata.tags = tags;
  }

  const hasMetadata = Object.keys(metadata).length > 0;

  let postCardStyle = styles.postCard;

  if (className) {
    postCardStyle = `${postCardStyle} ${className}`;
  }

  return (
    <div className={postCardStyle}>
      <Link href={postPathBySlug(slug)}>
        <h3
          className={styles.postCardTitle}
          dangerouslySetInnerHTML={{
            __html: title.replace('How to ', '<span class="sr-only">How to</span> '),
          }}
        />
      </Link>
      {hasMetadata && <Metadata className={styles.postCardMetadata} {...metadata} author={false} />}
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
