(function () {
  if (typeof ShieldME === "undefined") {
    window.ShieldME = {};
  }

  function randomColor() {
    var hexDigits = "0123456789ABCDEF";

    var color = "#";
    for (var i = 0; i < 3; i ++) {
      color += hexDigits[Math.floor((Math.random() * 16))];
    }

    return color;
  }

  var Ship = ShieldME.Ship = function (options) {
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || randomColor();
    options.pos = [500, 300];

    ShieldME.MovingObject.call(this, options)

    this.timeSinceLastChangeDirection = 0;
  };

  Ship.RADIUS = 15;

  var shipImg = new Image();
  shipImg.src = 'image/ufo.png';

  ShieldME.Util.inherits(Ship, ShieldME.MovingObject);

  Ship.prototype.draw = function ( ctx ) {
    ctx.drawImage(shipImg, 6, 5, 52, 30, this.pos[0], this.pos[1], 50, 50);
  };

  Ship.prototype.updateTime = function (delta) {
    this.timeSinceLastChangeDirection += delta;
  };

  Ship.prototype.resetTime = function () {
    this.timeSinceLastChangeDirection = 0;
  };

  Ship.prototype.resetXVel = function () {
    this.vel[0] = 0;
  };

  Ship.prototype.resetYVel = function () {
    this.vel[1] = 0;
  };

  Ship.prototype.fireBullet = function () {
    var norm = ShieldME.Util.norm(this.vel);

    if (norm == 0) {
      // Can't fire unless moving.
      return;
    }

    var relVel = ShieldME.Util.scale(
      ShieldME.Util.dir(this.vel),
      ShieldME.Bullet.SPEED
    );

    var bulletVel = [
      relVel[0] + this.vel[0], relVel[1] + this.vel[1]
    ];

    var bullet = new ShieldME.Bullet({
      pos: this.pos,
      vel: bulletVel,
      color: this.color,
      game: this.game
    });

    this.game.add(bullet);
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };
})();
