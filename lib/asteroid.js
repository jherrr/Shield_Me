(function () {
  if (typeof ShieldME === "undefined") {
    window.ShieldME = {};
  }

  var Asteroid = ShieldME.Asteroid = function (options) {
    options.color = Asteroid.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    options.radius = Asteroid.RADIUS;
    options.vel = options.vel || ShieldME.Util.randomVec(Asteroid.SPEED);

    ShieldME.MovingObject.call(this, options);
  };

  var asteroidImg = new Image();
  asteroidImg.src = 'image/asteroid.png';

  Asteroid.COLOR = "#505050";
  Asteroid.RADIUS = 25;
  Asteroid.SPEED = 4;

  ShieldME.Util.inherits(Asteroid, ShieldME.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof ShieldME.Ship) {
      // otherObject.relocate();
      otherObject.remove();
    }
  };

  Asteroid.prototype.draw = function (ctx) {
    ctx.drawImage(asteroidImg, 0, 0, 128, 128, this.pos[0], this.pos[1], 70, 50);
  };

})();
