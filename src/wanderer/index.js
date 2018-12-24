import Wanderer from './wanderer.js';
import randomNumber from '../../tools/random-number';
import * as PIXI from 'pixi.js';

const spriteName = 'circle';
const spriteURL = '/circle.png';

let ACTIONS = [];

const setup = (app) => {
  let sprite = new PIXI.Sprite(
    PIXI.loader.resources[spriteName].texture
  );

  sprite.x = randomNumber(0, (app.screen.width - sprite.width));
  sprite.y = app.screen.height - sprite.height;

  app.stage.addChild(sprite);
  app.ticker.add(delta => {
    loop(delta, app, sprite);
  });

  ACTIONS.push(float);

  window.float = () => {
    ACTIONS = [];
    ACTIONS.push(float);
  }
  window.drop = () => {
    ACTIONS = [];
    ACTIONS.push(drop);
  }
};

const float = (delta, app, sprite) => {
  const verticalMotionFavor = 0.8;
  const horizontalMotionFavor = 0.5;

  const xDistance = delta * (app.screen.width / 500);
  const yDistance = delta * (app.screen.height / 1000);

  const xMovementModifier = Math.random() > 0.5 ? 1 : -1;
  const yMovementModifier = Math.random() > 0.8 ? 1 : -1;

  const xMovement = Math.random() < horizontalMotionFavor
    ? xDistance * xMovementModifier
    : 0;
  const yMovement = Math.random() < verticalMotionFavor
    ? yDistance * yMovementModifier
    : 0;
  
  const xTarget = sprite.x + xMovement;
  const yTarget = sprite.y + yMovement;

  const x = xTarget < app.screen.width ? xTarget : sprite.x;
  const y = yTarget > 0 ? yTarget : sprite.y;

  sprite.x = x;
  sprite.y = y;
};

const drop = (delta, app, sprite) => {
  const distance = 1 * delta * (app.screen.height / 10);
  const targetY = sprite.y + distance;
  const y = targetY < app.screen.height - sprite.height ? targetY : app.screen.height - sprite.height;
  sprite.y = y;
};

const loop = (delta, app, sprite) => {
  ACTIONS.forEach(action => {
    action(delta, app, sprite);
  });
}

export default el => {
  const { width, height } = el.getBoundingClientRect();

  const app = new PIXI.Application(width, 600, { backgroundColor: 0xffffff });
  el.appendChild(app.view);
  
  PIXI.loader.add(spriteName, spriteURL).load(setup.bind(this, app));

  return;
};