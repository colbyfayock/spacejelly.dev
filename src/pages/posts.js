import { getAllPosts } from 'lib/posts';

import TemplateArchive from 'templates/archive';

export default function Posts({ posts }) {
  const title = 'All Posts';
  const slug = 'posts';

  return (
    <TemplateArchive
      title={title}
      posts={posts}
      slug={slug}
      postOptions={{
        excludeMetadata: ['tags'],
      }}
    />
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { posts } = await getAllPosts({
    queryIncludes: 'archive',
  });

  return {
    props: {
      posts,
    },
  };
}
