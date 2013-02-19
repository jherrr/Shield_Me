var Asteroids = (function () {
  function Asteroid (x, y) {
    var that = this;

    that.x = x;
    that.y = y;

    that.draw = function (ctx) {
      ctx.fillStyle = "#000";

      ctx.beginPath();
      ctx.arc(that.x, that.y, Asteroid.RADIUS, 0, 2 * Math.PI, true);
      ctx.fill();
    }
  }

  Asteroid.RADIUS = 25;
  Asteroid.randomAsteroid = function (dimX, dimY) {
    return new Asteroid(dimX * Math.random(), dimY * Math.random());
  };

  function Game (ctx) {
    var that = this;

    that.asteroids = _.times(10, function () {
      return Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y);
    });

    that.draw = function () {
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

      _.each(that.asteroids, function (asteroid) {
        asteroid.draw(ctx);
      });
    };

    FPS = 2;
    that.start = function () {
      setInterval(function () {
        that.draw();
      }, 1000 / FPS);
    };
  }

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;

  return {
    Asteroid: Asteroid,
    Game: Game
  };
})();

$(function () {
  var canvas = $("<canvas width='" + Asteroids.Game.DIM_X + 
                 "' height='" + Asteroids.Game.DIM_Y + "'></canvas>");
  $('body').append(canvas);

  var ctx = canvas.get(0).getContext("2d");
  new Asteroids.Game(ctx).start();
});
