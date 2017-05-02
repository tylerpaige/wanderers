import routes from './routes.js';

export default (el) => {
  routes.forEach((r) => {
    const markup = `<li>
      <a href="${r.path}">
        ${r.id}
      </a>
    </li>`;
    el.innerHTML += markup;
  });
};
