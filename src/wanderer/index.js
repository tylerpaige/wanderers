import Wanderer from './wanderer.js';
import randomNumber from '../../tools/random-number';
import * as PIXI from 'pixi.js';

const spriteName = 'circle';
const spriteURL = '/circle.png';

const setup = (app) => {
  const spriteCount = 5;
  const sprites = Array.from({ length : spriteCount})
    .map(() => {
      return new Wanderer(app);
    });
  
  app.ticker.add(delta => {
    sprites.forEach(sprite => {
      sprite.update(delta);
    });
  });

  sprites.forEach(sprite => {
    sprite.beginFloating();
  });

  setTimeout(() => {
    sprites.forEach(sprite => {
      sprite.beginDropping();
    });
  }, 1000 * 10);
};

export default el => {
  const { width, height } = el.getBoundingClientRect();

  const app = new PIXI.Application(width, 600, { backgroundColor: 0xffffff });
  el.appendChild(app.view);
  
  PIXI.loader.add(spriteName, spriteURL).load(setup.bind(this, app));

  return;
};