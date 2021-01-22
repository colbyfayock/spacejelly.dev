import routes from 'data/routes';

export function getRouteByName(name) {
  return routes.find((route) => route.name === name);
}
