import randomNumber from '../../tools/random-number';
import * as PIXI from 'pixi.js';

export default class Wanderer {
  constructor(app) {
    this.app = app;
    this.sprite = new PIXI.Sprite(PIXI.loader.resources['circle'].texture);

    this.sprite.x = randomNumber(0, app.screen.width - this.sprite.width);
    this.sprite.y = app.screen.height - this.sprite.height;

    app.stage.addChild(this.sprite);

    this.actions = [];
  }

  update(delta) {
    const { app } = this;
    this.actions.forEach(action => {
      action.call(this, delta, app);
    });
  }

  beginFloating() {
    this.actions = [];
    this.actions.push(this.float);
  }

  beginDropping() {
    this.actions = [];
    this.actions.push(this.drop);
  }

  float(delta) {
    const { sprite, app } = this;
    const verticalMotionFavor = 0.8;
    const horizontalMotionFavor = 0.5;

    const xDistance = delta * (app.screen.width / 500);
    const yDistance = delta * (app.screen.height / 1000);

    const xMovementModifier = Math.random() > 0.5 ? 1 : -1;
    const yMovementModifier = Math.random() > 0.8 ? 1 : -1;

    const xMovement =
      Math.random() < horizontalMotionFavor ? xDistance * xMovementModifier : 0;
    const yMovement =
      Math.random() < verticalMotionFavor ? yDistance * yMovementModifier : 0;

    const xTarget = sprite.x + xMovement;
    const yTarget = sprite.y + yMovement;

    const x = xTarget < app.screen.width ? xTarget : sprite.x;
    const y = yTarget > 0 ? yTarget : sprite.y;

    sprite.x = x;
    sprite.y = y;
  }

  drop(delta) {
    const { sprite, app } = this;

    const distance = 1 * delta * (app.screen.height / 10);
    const targetY = sprite.y + distance;
    const y =
      targetY < app.screen.height - sprite.height
        ? targetY
        : app.screen.height - sprite.height;
    sprite.y = y;
  }
}
