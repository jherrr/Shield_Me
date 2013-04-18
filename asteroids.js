var Asteroids = (function () {
  /* **helper functions** */
  function outOfBounds(x, y, dimX, dimY) {
    return (x < 0) || (y < 0) || (x > dimX) || (y > dimY);
  }

  function isCircleCollision(
    x1, y1, r1,
    x2, y2, r2) {
    var dist = Math.sqrt(
      Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
    );

    return dist < (r1 + r2);
  }

  /* **Asteroid** */
  function Asteroid (startX, startY, vel, game) {
    this.x = startX;
    this.y = startY;
    this.vel = vel;
    this.game = game;
  }

  Asteroid.prototype.draw = function (ctx) {
    var that = this;

    ctx.fillStyle = "#000"; // black
    ctx.beginPath();
    ctx.arc(that.x, that.y, Asteroid.RADIUS, 0, 2 * Math.PI, true);
    ctx.fill();
  };

  Asteroid.prototype.update = function () {
    var that = this;

    that.x += that.vel.x;
    that.y += that.vel.y;

    if (outOfBounds(that.x, that.y, Game.DIM_X, Game.DIM_Y)) {
      // remove asteroid from game array
      that.game.asteroids = _.without(that.game.asteroids, that);
    }
  };

  Asteroid.RADIUS = 25;
  Asteroid.SPEED = 4;
  Asteroid.randomAsteroid = function (dimX, dimY, speed, game) {
    return new Asteroid(
      dimX * Math.random(),
      dimY * Math.random(),
      { x: speed * Math.random(), y: speed * Math.random() },
      game
    );
  };

  /* **Ship** */
  function Ship (startX, startY, game) {
    this.x = startX;
    this.y = startY;
    this.game = game;

    this.vel = { x: 0, y: 0 };
  }

  Ship.prototype.draw = function (ctx) {
    var that = this;

    ctx.fillStyle = "#00F"

    ctx.beginPath();
    ctx.arc(that.x, that.y, Ship.RADIUS, 0, 2 * Math.PI, true);
    ctx.fill();
  };

  Ship.prototype.power = function (dx, dy) {
    var that = this;

    that.vel.x += dx;
    that.vel.y += dy;
  };

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

  Ship.prototype.update = function () {
    var that = this;
    that.x += that.vel.x;
    that.y += that.vel.y;

    that.x = Math.max(0, Math.min(Game.DIM_X, that.x));
    that.y = Math.max(0, Math.min(Game.DIM_Y, that.y));
  };

  Ship.prototype.isCollided = function (asteroid) {
    var that = this;

    return isCircleCollision(
      that.x, that.y, Ship.RADIUS,
      asteroid.x, asteroid.y, Asteroid.RADIUS);
  };

  Ship.RADIUS = 15;

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

  Bullet.prototype.draw = function (ctx) {
    var that = this;

    ctx.fillStyle = "#F00";

    ctx.beginPath();
    ctx.arc(that.x, that.y, Bullet.RADIUS, 0, 2 * Math.PI, true);
    ctx.fill();
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
