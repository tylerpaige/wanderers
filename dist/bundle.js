/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wanderer = __webpack_require__(6);

var _wanderer2 = _interopRequireDefault(_wanderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  path: '/',
  render: _wanderer2.default,
  id: 'Wanderers'
}];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _routes = __webpack_require__(0);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (el) {
  _routes2.default.forEach(function (r) {
    var markup = '<li>\n      <a href="' + r.path + '">\n        ' + r.id + '\n      </a>\n    </li>';
    el.innerHTML += markup;
  });
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _routes = __webpack_require__(0);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (el) {
  console.log(window.location.pathname);
  // debugger;
  var route = _routes2.default.find(function (r) {
    return r.path === window.location.pathname;
  });

  if (!route) {
    return false;
  }

  route.render(el);
  return true;
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _router = __webpack_require__(3);

var _router2 = _interopRequireDefault(_router);

var _nav = __webpack_require__(2);

var _nav2 = _interopRequireDefault(_nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(4);

document.addEventListener('DOMContentLoaded', function () {

  //Comile a list of links to different visualizations
  (0, _nav2.default)(document.querySelector('nav'));

  //Set up client side routing
  var main = document.querySelector('main');
  (0, _router2.default)(main);
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wanderer = __webpack_require__(7);

var _wanderer2 = _interopRequireDefault(_wanderer);

var _randomNumber = __webpack_require__(1);

var _randomNumber2 = _interopRequireDefault(_randomNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import * as PIXI from 'pixi.js';

var spriteName = 'circle';
var spriteURL = '/cloud.png';

var setup = function setup(app) {
  var spriteCount = 15;
  var sprites = Array.from({ length: spriteCount }).map(function () {
    return new _wanderer2.default(app, spriteName);
  });

  app.ticker.add(function (delta) {
    sprites.forEach(function (sprite) {
      sprite.update(delta);
    });
  });

  var waitingPeriod = void 0;
  var waitToFloat = function waitToFloat() {
    var forHowLong = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;

    waitingPeriod = setTimeout(function () {
      sprites.forEach(function (sprite) {
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

exports.default = function (el) {
  var box = document.createElement('div');
  box.style.width = '500px';
  box.style.height = '500px';
  box.style.background = 'tomato';
  el.appendChild(box);

  var _box$getBoundingClien = box.getBoundingClientRect(),
      width = _box$getBoundingClien.width,
      height = _box$getBoundingClien.height;

  var app = new PIXI.Application(width, height, { transparent: true });
  box.appendChild(app.view);

  PIXI.loader.add(spriteName, spriteURL).load(setup.bind(undefined, app));

  return;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _randomNumber = __webpack_require__(1);

var _randomNumber2 = _interopRequireDefault(_randomNumber);

var _clamp = __webpack_require__(8);

var _clamp2 = _interopRequireDefault(_clamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import * as PIXI from 'pixi.js';

var Wanderer = function () {
  function Wanderer(app, spriteName) {
    _classCallCheck(this, Wanderer);

    this.app = app;

    this.sprite = new PIXI.Sprite(PIXI.loader.resources[spriteName].texture);
    this.sprite.x = (0, _randomNumber2.default)(0, app.screen.width - this.sprite.width);
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

    this.targetInterval = (0, _randomNumber2.default)(1500, 3000);

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

  _createClass(Wanderer, [{
    key: 'update',
    value: function update(delta) {
      var _this = this;

      var app = this.app;

      this.actions.forEach(function (action) {
        action.call(_this, delta, app);
      });
    }
  }, {
    key: 'beginFloating',
    value: function beginFloating() {
      this.actions = [];
      this.actions.push(this.float);
    }
  }, {
    key: 'beginDropping',
    value: function beginDropping() {
      this.actions = [];
      this.actions.push(this.drop);
    }
  }, {
    key: 'getTarget',
    value: function getTarget() {
      var now = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().getTime();
      var _movementConfig = this.movementConfig,
          maxXDistance = _movementConfig.maxXDistance,
          minXDistance = _movementConfig.minXDistance,
          minYDistance = _movementConfig.minYDistance,
          maxYDistance = _movementConfig.maxYDistance;

      var xMultiplier = this.state.leftward ? -1 : 1;

      var originX = this.sprite.x;
      var originY = this.sprite.y;
      this.state.origin = [originX, originY];

      var deltaX = xMultiplier * (0, _randomNumber2.default)(minXDistance, maxXDistance);
      var deltaY = (0, _randomNumber2.default)(minYDistance, maxYDistance);

      var targetX = originX + deltaX;
      var targetY = originY + deltaY;
      this.state.target = [targetX, targetY];

      var ellipseCenterX = originX;
      var ellipseCenterY = targetY;
      this.state.ellipse.center = [ellipseCenterX, ellipseCenterY];

      var radiusX = this.state.leftward ? originX - targetX : targetX - originX;
      var radiusY = originY - targetY;
      this.state.ellipse.radii = [radiusX, radiusY];

      this.state.angle = 0;

      this.state.lastTimeTargeted = now;
      this.state.nextCheckpoint = now + this.targetInterval;

      this.state.angleModifier = this.state.leftward ? 90 : 0;
      this.state.angleFn = this.state.leftward ? function (t) {
        return (t * 90 + 90) * (Math.PI / 180);
      } : function (t) {
        return (90 - t * 90) * (Math.PI / 180);
      };

      this.state.leftward = !this.state.leftward;
    }
  }, {
    key: 'pointAlongEllipse',
    value: function pointAlongEllipse(angle) {
      var _state$ellipse = this.state.ellipse,
          center = _state$ellipse.center,
          radii = _state$ellipse.radii;

      var _radii = _slicedToArray(radii, 2),
          horRadius = _radii[0],
          vertRadius = _radii[1];

      var _center = _slicedToArray(center, 2),
          centerX = _center[0],
          centerY = _center[1];

      var x = (0, _clamp2.default)(Math.cos(angle) * horRadius + centerX, this.safeArea.x.min, this.safeArea.x.max);
      var y = (0, _clamp2.default)(Math.sin(angle) * vertRadius + centerY, this.safeArea.y.min, this.safeArea.y.max);

      return [x, y];
    }
  }, {
    key: 'float',
    value: function float(delta) {
      var sprite = this.sprite;

      /*
        every n seconds pick a new target
        get there by way of arc
      */

      var now = new Date().getTime();
      var timeCompletion = (now - this.state.lastTimeTargeted) / this.targetInterval;
      if (timeCompletion + 0.01 >= 1) {
        this.getTarget(now);
        return;
      }

      var angle = this.state.angleFn(timeCompletion);

      var _pointAlongEllipse = this.pointAlongEllipse(angle),
          _pointAlongEllipse2 = _slicedToArray(_pointAlongEllipse, 2),
          x = _pointAlongEllipse2[0],
          y = _pointAlongEllipse2[1];

      sprite.x = x;
      sprite.y = y;
    }
  }, {
    key: 'drop',
    value: function drop(delta) {
      var sprite = this.sprite,
          app = this.app;


      var distance = 1 * delta * (app.screen.height / 10);
      var targetY = sprite.y + distance;
      var y = targetY < app.screen.height - sprite.height ? targetY : app.screen.height - sprite.height;
      sprite.y = y;
    }
  }]);

  return Wanderer;
}();

exports.default = Wanderer;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (num, min, max) {
  return num <= min ? min : num >= max ? max : num;
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map