(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function (startPos, vel, game) {
    Asteroids.MovingObject.call(
      this, startPos, vel, Asteroid.RADIUS, Asteroid.GRAY
    );

    this.game = game;
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.GRAY = "#555";
  Asteroid.RADIUS = 25;
  Asteroid.SPEED = 4;

  function randomVec(length) {
    var x = Math.random() - 0.5;
    var y = Math.random() - 0.5;

    var preNorm = Asteroids.Util.norm([x, y]);
    var mult = length / preNorm;

    return [mult * x, mult * y];
  }

  Asteroid.randomAsteroid = function (dimX, dimY, game) {
    var startPos = [dimX * Math.random(), dimY * Math.random()];

    return new Asteroid(startPos, randomVec(Asteroid.SPEED), game);
  };

  Asteroid.prototype.remove = function() {
    this.game.removeAsteroid(this);
  };
})(this);
