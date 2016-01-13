(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (options) {
    options.color = Asteroid.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    options.radius = Asteroid.RADIUS;
    options.vel = options.vel || Asteroids.Util.randomVec(Asteroid.SPEED);

    Asteroids.MovingObject.call(this, options);
  };

  var asteroidImg = new Image();
  asteroidImg.src = 'image/asteroid.png';

  Asteroid.COLOR = "#505050";
  Asteroid.RADIUS = 25;
  Asteroid.SPEED = 4;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      // otherObject.relocate();
      otherObject.remove();
    }
  };

  Asteroid.prototype.draw = function (ctx) {
    ctx.drawImage(asteroidImg, 0, 0, 128, 128, this.pos[0], this.pos[1], 70, 50);
  };

})();
