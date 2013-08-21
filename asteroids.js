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
    this.bullets = [];
  }
})();
