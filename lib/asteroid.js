var Asteroids = function (Asteroids) {
  var Asteroid = Asteroids.Asteroid = function (startPos, vel, game) {
    MovingObject.call(this, startPos, vel, Asteroid.RADIUS, Asteroid.BLACK);
    this.game = game;
  };
  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.BLACK = "#000";
  Asteroid.RADIUS = 25;
  Asteroid.SPEED = 4;

  function randomVec(length) {
    var x = Math.random() - 0.5;
    var y = Math.random() - 0.5;

    var preNorm = Asteroids.Util.norm([x, y]);
    var mult = length / preNorm;

    return [mult * x, mult * y];
  }

  Asteroid.randomAsteroid = function (dimX, dimY, speed, game) {
    var startPos = [dimX * Math.random(), dimY * Math.random()];

    return new Asteroid(startPos, randomVec(Asteroid.SPEED), game);
  };

  return Asteroids;
})(Asteroids || {});
