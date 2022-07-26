import { getAllAuthors, getUserBySlug } from 'lib/users';
import { getAllCategories, getCategoryBySlug } from 'lib/categories';
import { getPostsByCategoryId } from 'lib/posts';

import TemplateArchive from 'templates/archive';
import Title from 'components/Title';

import styles from 'styles/pages/Post.module.scss';

export default function Category({ category, posts }) {
  const { name, description, slug } = category;

  return (
    <TemplateArchive title={name} Title={<Title title={name} />} description={description} posts={posts} slug={slug} />
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { category } = await getCategoryBySlug(params?.slug);

  if (!category) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { posts } = await getPostsByCategoryId(category.categoryId, {
    queryIncludes: 'archive',
  });

  return {
    props: {
      category,
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
