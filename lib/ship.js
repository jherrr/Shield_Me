(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function (pos, game) {
    Asteroids.MovingObject.call(
      this, pos, [0, 0], Ship.RADIUS, Ship.RED, game
    );
  };

  Ship.RADIUS = 15;
  Ship.RED = "#F00";

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.fireBullet = function () {
    var norm = Asteroids.Util.norm(this.vel);

    if (norm == 0) {
      // can't fire moving still
      return;
    } else {
      var mult = Asteroids.Bullet.SPEED / norm;
      var bulletVel = [mult * this.vel[0], mult * this.vel[1]];
      var bullet =
        new Asteroids.Bullet(this.pos, bulletVel, this.game);
      this.game.add(bullet);
    }
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.remove = function () {
    // do not actually remove; instead just reposition.
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };
})(this);
