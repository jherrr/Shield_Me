(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function (ctx) {
    this.ctx = ctx;

    this.asteroids = [];
    this.bullets = [];
    this.ship = new Asteroids.Ship(this.randomPosition(), this);
    this.timerId = null;

    this.addAsteroids(Game.NUM_ASTEROIDS)
  };

  Game.FPS = 32;
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 5;
  Game.BLACK = "#000";

  Game.prototype.addAsteroids = function (numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      var asteroid = Asteroids.Asteroid.randomAsteroid(this);
      this.asteroids.push(asteroid);
    }
  };

  Game.prototype.allObjects = function () {
    return [this.ship].concat(this.asteroids).concat(this.bullets);
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    });
  };

  Game.prototype.draw = function () {
    var game = this;

    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ctx.fillStyle = Game.BLACK;
    this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(game.ctx);
    });
  };

  Game.prototype.fireBullet = function () {
    var bullet = this.ship.fireBullet();

    if (bullet) {
      // ship may not fire if still
      this.bullets.push(bullet);
    }
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0)
      || (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) { object.move(); });
  };

  Game.prototype.randomPosition = function () {
    return [Game.DIM_X * Math.random(), Game.DIM_Y * Math.random()];
  }

  Game.prototype.remove = function (object) {
    if (object.constructor == Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object.constructor == Asteroids.Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
    } else {
      throw "wtf?";
    }
  }

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
    this.draw();
  };

  Game.prototype.bindKeyHandlers = function () {
    var game = this;

    var MOVES = {
      "q": [-1, -1],
      "w": [ 0, -1],
      "e": [ 1, -1],
      "a": [-1,  0],
      "s": [ 0,  0],
      "d": [ 1,  0],
      "z": [-1,  1],
      "x": [ 0,  1],
      "c": [ 1,  1]
    }

    for (c in MOVES) {
      (function (c, impulse) {
        key(c, function () { game.ship.power(impulse); });
      })(c, MOVES[c]);
    };

    key("space", function () { game.fireBullet() });
  };

  Game.prototype.start = function () {
    this.timerId = setInterval(
      this.step.bind(this),
      1000 / Game.FPS
    );

    this.bindKeyHandlers();
  };

  Game.prototype.stop = function () {
    clearInterval(this.timerId);
  };
})(this);
