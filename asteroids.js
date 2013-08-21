var Asteroids = (function () {
  Ship.prototype.fireBullet = function () {
    var that = this;

    // The *norm* of a vector is its length. The norm of velocity is
    // speed.
    var norm = Math.sqrt(
      Math.pow(that.vel.x, 2) +
        Math.pow(that.vel.y, 2));

    if (norm == 0)
      // can't fire moving still
      return;

    // Dividing vel vector by speed gives you direction.
    var dir = { x: that.vel.x / norm, y: that.vel.y / norm };
    new Bullet(that.x, that.y, dir, that.game);
  };

  /* **Bullet constructor** */
  function Bullet (startX, startY, dir, game) {
    this.x = startX;
    this.y = startY;
    this.dir = dir;
    this.game = game;

    this.game.bullets.push(this);
  }

  Bullet.prototype.update = function () {
    var that = this;

    that.x += that.dir.x * Bullet.SPEED;
    that.y += that.dir.y * Bullet.SPEED;

    if (outOfBounds(that.x, that.y, Game.DIM_X, Game.DIM_Y)) {
      that.game.bullets = _.without(that.game.bullets, that);
    }

    that.game.asteroids = _.filter(
      that.game.asteroids,
      function (asteroid) {
        return !isCircleCollision(
          that.x, that.y, Bullet.RADIUS,
          asteroid.x, asteroid.y, Asteroid.RADIUS
        );
      }
    );
  };

  Bullet.RADIUS = 2;
  Bullet.SPEED = 15;

  /* **Game** */
  function Game (ctx) {
    this.ctx = ctx;
    this.timerId = null;

    this.ship = new Ship(Game.DIM_X / 2, Game.DIM_Y / 2, this);
    this.bullets = [];
    this.populateAsteroids();
  }


  Game.prototype.populateAsteroids = function () {
    var that = this;

    that.asteroids = _.times(10, function () {
      return Asteroid.randomAsteroid(
        Game.DIM_X,
        Game.DIM_Y,
        Asteroid.SPEED,
        that
      );
    });
  };


  Game.prototype.checkCollisions = function () {
    var that = this;

    _.each(that.asteroids, function (asteroid) {
      if (that.ship.isCollided(asteroid)) {
        alert("You died!");
        that.stop();
      }
    });
  };

  Game.prototype.update = function () {
    var that = this;

    that.ship.update();

    _.each(that.asteroids, function (asteroid) {
      asteroid.update();
    });

    _.each(that.bullets, function (bullet) {
      bullet.update();
    });
  };

  Game.prototype.bindKeyHandlers = function () {
    var that = this;

    var moves = {
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

    _.each(moves, function (v, k) {
      key(k, function () { that.ship.power(v[0], v[1]) });
    });

    key("space", function () { that.ship.fireBullet() });
  };

  Game.prototype.draw = function () {
    var that = this;

    that.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    that.ship.draw(that.ctx);

    _.each(that.asteroids, function (asteroid) {
      asteroid.draw(that.ctx);
    });

    _.each(that.bullets, function (bullet) {
      bullet.draw(that.ctx);
    });
  };

  Game.prototype.start = function () {
    var that = this;

    that.bindKeyHandlers();
    that.timerId = setInterval(function () {
      that.update();
      that.draw();

      that.checkCollisions();
    }, 1000 / Game.FPS);
  };

  Game.prototype.stop = function () {
    var that = this;

    clearInterval(that.timerId);
  }

  Game.FPS = 32;
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;

  return {
    Game: Game
  };
})();
