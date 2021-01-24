import { useEffect } from 'react';

import useSearch from 'hooks/use-search';

import TemplateArchive from 'templates/archive';

export default function Search() {
  const { query, results, search } = useSearch();
  const title = 'Search';
  const slug = 'search';

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    search({
      query: params.get('q'),
    });
  }, []);

  return <TemplateArchive title={title} posts={results} slug={slug} />;
}
