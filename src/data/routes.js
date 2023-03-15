const routes = [];

routes.push({
  name: 'about',
  path: '/about/',
});

routes.push({
  name: 'books',
  path: '/books/',
});

routes.push({
  name: 'colbyashiMaru',
  path: '/colbyashi-maru/',
});

routes.push({
  name: 'courses',
  path: '/courses/',
});

routes.push({
  name: 'home',
  path: '/',
});

routes.push({
  name: 'posts',
  path: '/posts/',
});

routes.push({
  name: 'store',
  path: '/store/',
});

/**
 * Categories
 */

routes.push({
  name: 'categoryJamstack',
  path: '/categories/jamstack/',
});

routes.push({
  name: 'categoryGithubActions',
  path: '/categories/github-actions/',
});

routes.push({
  name: 'categoryMedia',
  path: '/categories/media/',
});

routes.push({
  name: 'categoryNextjs',
  path: '/categories/next-js/',
});

routes.push({
  name: 'categoryReact',
  path: '/categories/react/',
});

/**
 * Misc
 */

routes.push({
  name: 'sitemap',
  path: '/sitemap.xml',
});

routes.push({
  name: 'rss',
  path: '/feed.xml',
});

export default routes;
