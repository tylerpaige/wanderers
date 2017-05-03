import router from './router.js';
import initNav from './nav.js';

// import style from '../scss/base.scss';
require('../scss/base.scss');

document.addEventListener('DOMContentLoaded', () => {
  console.log('Start er off');

  //Comile a list of links to different visualizations
  initNav(document.querySelector('nav'));

  //Set up client side routing
  const main = document.querySelector('main');
  router(main);
})
