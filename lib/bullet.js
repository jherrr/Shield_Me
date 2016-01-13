(function () {
  if (typeof ShieldME === "undefined") {
    window.ShieldME = {};
  }

  var Bullet = ShieldME.Bullet = function (options) {
    options.radius = Bullet.RADIUS;

    ShieldME.MovingObject.call(this, options);
  };

  Bullet.RADIUS = 2;
  Bullet.SPEED = 15;

  ShieldME.Util.inherits(Bullet, ShieldME.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof ShieldME.Asteroid) {
      this.remove();
      otherObject.remove();
    }
  };

  Bullet.prototype.isWrappable = false;
})();
