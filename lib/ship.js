(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function (startPos, game) {
    Asteroids.MovingObject.call(
      this, startPos, [0, 0], Ship.RADIUS, Ship.RED
    );

    this.startPos = startPos;
    this.game = game;
  };

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.fireBullet = function () {
    var norm = Asteroids.Util.norm(this.vel);

    if (norm == 0) {
      // can't fire moving still
      return;
    } else {
      var mult = Asteroids.Bullet.SPEED / norm;
      var bulletVel = [mult * this.vel[0], mult * this.vel[1]];
      return new Asteroids.Bullet(this.pos, bulletVel, this.game);
    }
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.remove = function () {
    // Move back to the start if fell off the board. Ideally we'd move
    // it back to the appropriate edge on the other side, but this is
    // fine.
    this.pos = this.startPos;
  };

  Ship.RADIUS = 15;
  Ship.RED = "#F00";
})(this);
