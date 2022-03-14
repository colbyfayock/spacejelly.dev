import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

const searchKeys = ['slug', 'title'];

let fuse;

export default function useSearch({ defaultQuery, maxResults } = {}) {
  const [index, setIndex] = useState();
  const [query, setQuery] = useState(defaultQuery);
  let results = query && index ? index.posts : [];

  useEffect(() => {
    (async function run() {
      const results = await fetch('/wp-search.json').then((r) => r.json());

      setIndex(results);

      fuse = new Fuse(results.posts, {
        keys: searchKeys,
        isCaseSensitive: false,
      });
    })();
  }, []);

  // If the defaultQuery argument changes, the hook should reflect
  // that update and set that as the new state

  useEffect(() => setQuery(defaultQuery), [defaultQuery]);

  // If we have a query, make a search with fuse. Otherwise, don't
  // modify the results to avoid passing back empty results

  if (query && fuse) {
    results = fuse.search(query).map(({ item }) => item);
  }

  if (maxResults && results.length > maxResults) {
    results = results.slice(0, maxResults);
  }

  /**
   * handleSearch
   */

  function handleSearch({ query }) {
    setQuery(query);
  }

  /**
   * handleClearSearch
   */

  function handleClearSearch() {
    setQuery(undefined);
  }

  return {
    query,
    results,
    search: handleSearch,
    clearSearch: handleClearSearch,
  };
}
