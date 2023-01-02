import Link from 'next/link';

import { postPathBySlug, sanitizeExcerpt } from 'lib/posts';

import Metadata from 'components/Metadata';

import styles from './PostCard.module.scss';

const PostCard = ({ post, options = {} }) => {
  const { title, excerpt, slug, date, author, categories } = post;
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
      <Metadata className={styles.postCardMetadata} {...metadata} author={false} />
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
