import router from './router.js';
import initNav from './nav.js';

document.addEventListener('DOMContentLoaded', () => {
  //Comile a list of links to different visualizations
  initNav(document.querySelector('nav'));

  //Set up client side routing
  const main = document.querySelector('main');
  router(main);
})
