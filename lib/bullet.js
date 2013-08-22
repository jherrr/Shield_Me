var Asteroids = (function (Asteroids) {
  var Bullet = Asteroids.Bullet = function (startPos, vel, game) {
    Asteroids.MovingObject.call(
      this, startPos, vel, Bullet.RADIUS, Bullet.BLUE
    );

    this.game = game;
  };

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.BLUE = "#00F";
  Bullet.RADIUS = 2;
  Bullet.SPEED = 15;

  Bullet.prototype.move = function () {
    Asteroids.MovingObject.prototype.move.call(this);

    this.hitAsteroids();
  };

  Bullet.prototype.hitAsteroids = function () {
    var bullet = this;
    
    // TODO: Is this reaching too far outside of bullet?
    // law of demeter violation
    this.game.asteroids.forEach(function (asteroid) {
      if (bullet.isCollidedWith(asteroid)) {
        asteroid.remove();
        bullet.remove();
      }
    });
  };

  Bullet.prototype.remove = function () {
    this.game.removeBullet(this);
  };

  return Asteroids;
})(Asteroids || {});
