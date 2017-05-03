import routes from './routes.js';

export default (el) => {
  console.log(window.location.pathname);
  // debugger;
  const route = routes.find((r) => {
    return r.path === window.location.pathname
  });

  if (!route) {
    el.innerHTML = '';
    return false;
  }

  el.innerHTML = route.render();
  return true;
};
