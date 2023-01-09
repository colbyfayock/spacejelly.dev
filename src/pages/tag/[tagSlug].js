import { getTagBySlug } from 'lib/tags';
import { getPostsByTagSlug } from 'lib/posts';

import TemplateArchive from 'templates/archive';
import Title from 'components/Title';

export default function Tag({ tag, posts }) {
  const { name, description, slug } = tag;

  return (
    <TemplateArchive title={name} Title={<Title title={name} />} description={description} posts={posts} slug={slug} />
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { tag } = await getTagBySlug(params?.tagSlug);

  if (!tag) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { posts } = await getPostsByTagSlug(tag.slug, {
    queryIncludes: 'archive',
  });

  return {
    props: {
      tag,
      posts,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
