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
  name: 'home',
  path: '/',
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
  name: 'categoryNextjs',
  path: '/categories/next-js/',
});

routes.push({
  name: 'categoryReact',
  path: '/categories/react/',
});

export default routes;
