(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function (pos, vel, game) {
    Asteroids.MovingObject.call(
      this, pos, vel, Bullet.RADIUS, Bullet.YELLOW, game
    );
  };

  Bullet.YELLOW = "#FF0";
  Bullet.RADIUS = 2;
  Bullet.SPEED = 15;

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject.constructor !== Asteroids.Asteroid) {
      return;
    }

    this.remove();
    otherObject.remove();
  };

  Bullet.prototype.isWrappable = false;
})(this);
