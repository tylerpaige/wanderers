import routes from './routes.js';

export default (el) => {
  let route;
  try {
    route = routes.find((r) => {
      return r.path === window.location.pathname
    });
  } catch (e) {
    return false;
  }

  el.innerHTML = route.render();
  return true;
};
