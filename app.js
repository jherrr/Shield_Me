var Asteroids = (function () {
  function outOfBounds(x, y, dimX, dimY) {
    return (x < 0) || (y < 0) || (x > dimX) || (y > dimY);
  }

  function Asteroid (startX, startY, vel, game) {
    var that = this;

    that.x = startX;
    that.y = startY;

    that.draw = function (ctx) {
      ctx.fillStyle = "#000";

      ctx.beginPath();
      ctx.arc(that.x, that.y, Asteroid.RADIUS, 0, 2 * Math.PI, true);
      ctx.fill();
    }

    that.update = function () {
      that.x += vel.x;
      that.y += vel.y;

      if (outOfBounds(that.x, that.y, Game.DIM_X, Game.DIM_Y)) {
        game.asteroids =
          _.without(game.asteroids, that);
      }
    }
  }

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

  function Ship (startX, startY, game) {
    var that = this;

    that.x = startX;
    that.y = startY;

    that.vel = { x: 0, y: 0 };

    that.draw = function (ctx) {
      ctx.fillStyle = "#00F"

      ctx.beginPath();
      ctx.arc(that.x, that.y, Ship.RADIUS, 0, 2 * Math.PI, true);
      ctx.fill();
    };

    that.power = function (dx, dy) {
      that.vel.x += dx;
      that.vel.y += dy;
    }

    that.fireBullet = function () {
      var norm = Math.sqrt(
        Math.pow(that.vel.x, 2) +
          Math.pow(that.vel.y, 2));

      if (norm == 0)
        // can't fire moving still
        return;

      var dir = { x: that.vel.x / norm, y: that.vel.y / norm };
      game.bullets.push(new Bullet(that.x, that.y, dir, game));
    }

    that.update = function () {
      that.x += that.vel.x;
      that.y += that.vel.y;

      that.x = Math.max(0, Math.min(Game.DIM_X, that.x));
      that.y = Math.max(0, Math.min(Game.DIM_Y, that.y));
    };

    that.isCollided = function (asteroid) {
      var dist = Math.sqrt(
        Math.pow((that.x - asteroid.x), 2) +
          Math.pow((that.y - asteroid.y), 2));

      return (dist - (Ship.RADIUS + Asteroid.RADIUS)) < 0;
    };
  }

  Ship.RADIUS = 15;

  function Bullet (startX, startY, dir, game) {
    var that = this;

    that.x = startX;
    that.y = startY;

    that.update = function () {
      that.x += dir.x * Bullet.SPEED;
      that.y += dir.y * Bullet.SPEED;

      if (outOfBounds(that.x, that.y, Game.DIM_X, Game.DIM_Y)) {
        game.bullets = _.without(game.bullets, that);
      }
    }

    that.draw = function (ctx) {
      ctx.fillStyle = "#F00";

      ctx.beginPath();
      ctx.arc(that.x, that.y, Bullet.RADIUS, 0, 2 * Math.PI, true);
      ctx.fill();
    }
  }

  Bullet.RADIUS = 2;
  Bullet.SPEED = 15;

  function Game (ctx) {
    var that = this;

    that.timerId = null;

    that.ship = new Ship(Game.DIM_X / 2, Game.DIM_Y / 2, that);
    that.asteroids = _.times(10, function () {
      return Asteroid.randomAsteroid(
        Game.DIM_X,
        Game.DIM_Y,
        Asteroid.SPEED,
        that
      );
    });
    that.bullets = [];

    that.checkCollisions = function () {
      _.each(that.asteroids, function (asteroid) {
        if (that.ship.isCollided(asteroid)) {
          alert("You died!");
          that.stop();
        }
      });
    }

    that.update = function () {
      that.ship.update();

      _.each(that.asteroids, function (asteroid) {
        asteroid.update();
      });

      _.each(that.bullets, function (bullet) {
        bullet.update();
      });
    }

    that.bindKeyHandlers = function () {
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
    }

    that.draw = function () {
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

      that.ship.draw(ctx);

      _.each(that.asteroids, function (asteroid) {
        asteroid.draw(ctx);
      });
      _.each(that.bullets, function (bullet) {
        bullet.draw(ctx);
      });
   };

    FPS = 32;
    that.start = function () {
      that.bindKeyHandlers();
      that.timerId = setInterval(function () {
        that.update();
        that.draw();

        that.checkCollisions();
      }, 1000 / FPS);
    };

    that.stop = function () {
      clearInterval(that.timerId);
    }
  }

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;

  return {
    Asteroid: Asteroid,
    Game: Game
  };
})();

$(function () {
  var canvas = $("<canvas width='" + Asteroids.Game.DIM_X + 
                 "' height='" + Asteroids.Game.DIM_Y + "'></canvas>");
  $('body').append(canvas);

  var ctx = canvas.get(0).getContext("2d");
  new Asteroids.Game(ctx).start();
});
