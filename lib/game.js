(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function (ctx) {
    this.ctx = ctx;

    this.ship = new Asteroids.Ship([Game.DIM_X / 2, Game.DIM_Y / 2], this);

    this.asteroids = [];
    this.addAsteroids(Game.NUM_ASTEROIDS)

    this.bullets = [];

    this.timerId = null;
  };

  Game.prototype.addAsteroids = function (numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      var asteroid = Asteroids.Asteroid.randomAsteroid(
        Game.DIM_X, Game.DIM_Y, this
      );

      this.asteroids.push(asteroid);
    }
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

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.asteroids.forEach(function (asteroid) {
      if (game.ship.isCollidedWith(asteroid)) {
        alert("You died!");
        game.stop();
      }
    });
  };

  Game.prototype.draw = function () {
    var game = this;
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    var objects = [this.ship].concat(this.asteroids).concat(this.bullets);
    objects.forEach(function (object) {
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
    var game = this;

    var objects = [this.ship].concat(this.asteroids).concat(this.bullets);
    objects.forEach(function (object) {
      object.move();

      if (game.isOutOfBounds(object.pos)) {
        object.remove();
      }
    });
  };

  Game.prototype.removeBullet = function (bullet) {
    this.bullets.splice(this.bullets.indexOf(bullet), 1);    
  };

  Game.prototype.removeAsteroid = function (asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
  };

  Game.prototype.start = function () {
    this.timerId = setInterval(
      this.step.bind(this),
      1000 / Game.FPS
    );

    this.bindKeyHandlers();
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.draw();

    this.checkCollisions();
  };

  Game.prototype.stop = function () {
    clearInterval(this.timerId);
  };

  Game.FPS = 32;
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 20;

  return Asteroids;
})(this);
