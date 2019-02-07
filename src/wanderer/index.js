import Wanderer from './wanderer.js';
import randomNumber from '../../tools/random-number';
// import * as PIXI from 'pixi.js';

const spriteName = 'circle';
const spriteURL = '/cloud.png';

const setup = (app) => {
  const spriteCount = 15;
  const sprites = Array.from({ length : spriteCount})
    .map(() => {
      return new Wanderer(app, spriteName);
    });
  
  app.ticker.add(delta => {
    sprites.forEach(sprite => {
      sprite.update(delta);
    });
  });

  let waitingPeriod;
  let waitToFloat = (forHowLong = 3000) => {
    waitingPeriod = setTimeout(() => {
      sprites.forEach(sprite => {
        sprite.beginFloating();
      });
    }, forHowLong);
  };
  waitToFloat(0);

  // window.addEventListener('scroll', () => {
  //   sprites.forEach(sprite => {
  //     sprite.beginDropping();
  //   });
  //   clearTimeout(waitingPeriod);
  //   waitToFloat();
  // });
};

export default el => {
  const box = document.createElement('div');
  box.style.width = '500px';
  box.style.height = '500px';
  box.style.background = 'tomato';
  el.appendChild(box);

  const { width, height } = box.getBoundingClientRect();

  const app = new PIXI.Application(width, height, { transparent : true });
  box.appendChild(app.view);
  
  PIXI.loader.add(spriteName, spriteURL).load(setup.bind(this, app));

  return;
};