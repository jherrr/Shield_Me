(function () {
  var Asteroids;
  if (typeof(window) === 'undefined') {
    Asteroids = global.Asteroids = (global.Asteroids || {});
  } else {
    Asteroids = window.Asteroids = (window.Asteroids || {});
  }

  var Asteroid = Asteroids.Asteroid = function (pos, vel, game) {
    Asteroids.MovingObject.call(
      this, pos, vel, Asteroid.RADIUS, Asteroid.GRAY, game
    );
  };

  Asteroid.GRAY = "#555";
  Asteroid.RADIUS = 25;
  Asteroid.SPEED = 4;

  Asteroid.randomAsteroid = function (game) {
    return new Asteroid(
      game.randomPosition(),
      Asteroids.Util.randomVec(Asteroid.SPEED),
      game
    );
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject.constructor !== Asteroids.Ship) {
      return;
    }

    otherObject.remove();
  }
})();
