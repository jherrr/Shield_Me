(function (root) {
  var Asteroids;
  if (typeof(window) === 'undefined') {
    Asteroids = global.Asteroids = (global.Asteroids || {});
  } else {
    Asteroids = window.Asteroids = (window.Asteroids || {});
  }

  var Bullet = Asteroids.Bullet = function (pos, vel, game) {
    Asteroids.MovingObject.call(
      this, pos, vel, Bullet.RADIUS, Bullet.YELLOW, game
    );
  };

  Bullet.YELLOW = "#FF0";
  Bullet.RADIUS = 2;
  Bullet.SPEED = 15;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject.constructor !== Asteroids.Asteroid) {
      return;
    }

    this.remove();
    otherObject.remove();
  };

  Bullet.prototype.isWrappable = false;
})(this);
