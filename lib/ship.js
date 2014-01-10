(function (root) {
  var Asteroids;
  if (typeof(window) === 'undefined') {
    Asteroids = global.Asteroids = (global.Asteroids || {});
  } else {
    Asteroids = window.Asteroids = (window.Asteroids || {});
  }

  var Ship = Asteroids.Ship = function (options) {
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = Ship.RED;

    Asteroids.MovingObject.call(this, options)
  };

  Ship.RADIUS = 15;
  Ship.RED = "#F00";

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.fireBullet = function () {
    var norm = Asteroids.Util.norm(this.vel);

    if (norm == 0) {
      // can't fire moving still
      return;
    } else {
      var relVel = Asteroids.Util.scale(
        Asteroids.Util.dir(this.vel),
        Asteroids.Bullet.SPEED
      );

      var bulletVel = [
        relVel[0] + this.vel[0], relVel[1] + this.vel[1]
      ];

      var bullet = new Asteroids.Bullet({
        pos: this.pos,
        vel: bulletVel,
        game: this.game
      });
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
