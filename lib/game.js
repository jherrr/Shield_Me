var Asteroids = (function (Asteroids) {
  var Game = Asteroids.Game = function (ctx) {
    this.ctx = ctx;

    this.ship = new Ship(Game.DIM_X / 2, Game.DIM_Y / 2, this);

    this.asteroids = [];
    this.addAsteroids(Game.NUM_ASTEROIDS)

    this.timerId = null;
  };

  Game.prototype.addAsteroids = function (numAsteroids) {
    for (var i = 0; i < num; i++) {
      this.asteroids.push(
        Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y, Asteroid.SPEED, this)
      );
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

    MOVES.forEach(function (v, k) {
      key(k, function () { game.ship.power(v[0], v[1]) });      
    });

    // key("space", function () { game.ship.fireBullet() });
  };

  Game.prototype.checkCollisions = function () {
    for (var i = 0; i < this.asteroids.length; i++) {
      var asteroid = this.asteroids[i];
      if (this.ship.isCollidedWith(asteroid)) {
        alert("You died!");
        this.stop();
      }
    }
  };

  Game.prototype.draw = function () {
    that.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    that.ship.draw(that.ctx);

    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(this.ctx);
    }
  };

  Game.prototype.moveObjects = function () {
    this.ship.move();
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].move();
    }
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
    this.update();
    this.draw();

    this.checkCollisions();
  };

  Game.prototype.stop = function () {
    clearnInterval(this.timerId);
  };

  Game.FPS = 32;
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 20;

  return Asteroids;
})(Asteroids);
