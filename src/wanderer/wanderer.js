import randomNumber from '../../tools/random-number';
import clamp from '../../tools/clamp';
// import * as PIXI from 'pixi.js';

export default class Wanderer {
  constructor(app, spriteName) {
    this.app = app;

    this.sprite = new PIXI.Sprite(PIXI.loader.resources[spriteName].texture);
    this.sprite.x = randomNumber(0, app.screen.width - this.sprite.width);
    this.sprite.y = app.screen.height - this.sprite.height;
    app.stage.addChild(this.sprite);

    this.safeArea = {};
    this.safeArea.x = {};
    this.safeArea.x.min = 0;
    this.safeArea.x.max = this.app.screen.width - this.sprite.width;
    this.safeArea.y = {};
    this.safeArea.y.min = 0;
    this.safeArea.y.max = this.app.screen.height - this.sprite.height;

    this.movementConfig = {};
    this.movementConfig.minXDistance = this.app.screen.width * 0.125;
    this.movementConfig.maxXDistance = this.app.screen.width * 0.33;
    this.movementConfig.minYDistance = this.app.screen.height * -0.2;
    this.movementConfig.maxYDistance = this.app.screen.height * 0.01;

    this.targetInterval = randomNumber(3000, 6000);

    this.actions = [];

    this.state = {};
    this.state.lastTimeTargeted = new Date().getTime();
    this.state.target = null;
    this.state.origin = null;
    this.state.ellipse = {};
    this.state.ellipse.center = null;
    this.state.ellipse.radii = null;
    this.state.angle = null;
    this.state.leftward = Math.random() > 0.5;

    this.getTarget();
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

  getTarget(now = new Date().getTime()) {
    const {
      maxXDistance,
      minXDistance,
      minYDistance,
      maxYDistance
    } = this.movementConfig;
    const xMultiplier = this.state.leftward ? -1 : 1;

    const originX = this.sprite.x;
    const originY = this.sprite.y;
    this.state.origin = [originX, originY];

    const deltaX = xMultiplier * randomNumber(minXDistance, maxXDistance);
    const deltaY = randomNumber(minYDistance, maxYDistance);

    const targetX = originX + deltaX;
    const targetY = originY + deltaY;
    this.state.target = [targetX, targetY];

    const ellipseCenterX = originX;
    const ellipseCenterY = targetY;
    this.state.ellipse.center = [ellipseCenterX, ellipseCenterY];

    const radiusX = this.state.leftward ? originX - targetX : targetX - originX;
    const radiusY = originY - targetY;
    this.state.ellipse.radii = [radiusX, radiusY];

    this.state.lastTimeTargeted = now;
    this.state.nextCheckpoint = now + this.targetInterval;

    this.state.angleModifier = this.state.leftward ? 90 : 0;
    this.state.angleFn = this.state.leftward
      ? t => (t * 90 + 90) * (Math.PI / 180)
      : t => (90 - t * 90) * (Math.PI / 180);

    this.state.leftward = !this.state.leftward;
  }

  pointAlongEllipse(angle) {
    const { center, radii } = this.state.ellipse;
    const [horRadius, vertRadius] = radii;
    const [centerX, centerY] = center;

    const x = clamp(
      Math.cos(angle) * horRadius + centerX,
      this.safeArea.x.min,
      this.safeArea.x.max
    );
    const yMin = Math.max(this.app.view.offsetTop * -1, this.safeArea.y.min);
    let y = clamp(
      Math.sin(angle) * vertRadius + centerY,
      yMin,
      this.safeArea.y.max
    );
    

    return [x, y];
  }

  float(delta) {
    const { sprite } = this;

    /*
      every n seconds pick a new target
      get there by way of arc
    */
    const now = new Date().getTime();
    const timeCompletion =
      (now - this.state.lastTimeTargeted) / this.targetInterval;
    if (timeCompletion + 0.01 >= 1) {
      this.getTarget(now);
      return;
    }

    const angle = this.state.angleFn(timeCompletion);
    const [x, y] = this.pointAlongEllipse(angle);

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

    const that = this;
    clearTimeout(that.state.delay)

    if (targetY >= (app.screen.height - sprite.height)) {
      this.actions = [];
      this.state.delay = setTimeout(() => {
        this.beginFloating();
      }, 3000);
    }

    this.state.lastTimeTargeted = null;
    this.state.target = null;
    this.state.origin = null;
    this.state.ellipse = {};
    this.state.ellipse.center = null;
    this.state.ellipse.radii = null;
    this.state.angle = null;
    this.state.leftward = Math.random() > 0.5;
    this.state.lastTimeTargeted = null;
    this.state.nextCheckpoint = null;
  }
}
