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
    
    if (this.game.isOutOfBounds(this.pos)) {
      this.game.removeBullet(this);
      return;
    }
  };

  Bullet.prototype.hitAsteroids = function () {
    var that = this;
    
    // TODO: Is this reaching too far outside of bullet?
    this.game.asteroids.forEach(function (asteroid) {
      if (that.isCollidedWith(asteroid)) {
        that.game.removeAsteroid(asteroid);
      }
    });
  };

  return Asteroids;
})(Asteroids || {});
