import { getAllAuthors, getUserByNameSlug, userSlugByName } from 'lib/users';
import { getPostsByAuthorSlug } from 'lib/posts';

import TemplateArchive from 'templates/archive';
import Title from 'components/Title';
import { AuthorJsonLd } from 'lib/json-ld';

export default function Author({ user, posts }) {
  const { name, avatar, description, slug } = user;
  const pageSlug = userSlugByName(name);

  const postOptions = {
    excludeMetadata: ['author'],
  };

  const archiveSettings = {};

  if (pageSlug === 'cosmo-the-space-jellyfish') {
    archiveSettings.Description = () => {
      return (
        <>
          {description}
          <br />
          <br />
          Generated with <a href="https://videotapit.com?via=colby">Video Tap</a>
        </>
      );
    };
  }

  return (
    <>
      <TemplateArchive
        title={name}
        Title={<Title title={name} thumbnail={avatar} />}
        posts={posts}
        description={description}
        postOptions={postOptions}
        slug={slug}
        {...archiveSettings}
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
