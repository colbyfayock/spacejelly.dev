import { getAllAuthors, getUserByNameSlug, userSlugByName } from 'lib/users';
import { getPostsByAuthorSlug } from 'lib/posts';

import TemplateArchive from 'templates/archive';
import Title from 'components/Title';
import { AuthorJsonLd } from 'lib/json-ld';

export default function Author({ user, posts }) {
  const { name, avatar, description, slug } = user;

  const postOptions = {
    excludeMetadata: ['author'],
  };

  return (
    <>
      <TemplateArchive
        title={name}
        Title={<Title title={name} thumbnail={avatar} />}
        description={description}
        posts={posts}
        postOptions={postOptions}
        slug={slug}
      />
      <AuthorJsonLd author={user} />
    </>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { user } = await getUserByNameSlug(params?.slug);

  if (!user) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { posts } = await getPostsByAuthorSlug(user?.slug);
  return {
    props: {
      user,
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
