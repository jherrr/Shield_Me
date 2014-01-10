(function (root) {
  var Asteroids;
  if (typeof(window) === 'undefined') {
    Asteroids = global.Asteroids = (global.Asteroids || {});
  } else {
    Asteroids = window.Asteroids = (window.Asteroids || {});
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.timerId = null;
  };

  GameView.MOVES = {
    "q": [-1, -1],
    "w": [ 0, -1],
    "e": [ 1, -1],
    "a": [-1,  0],
    "s": [ 0,  0],
    "d": [ 1,  0],
    "z": [-1,  1],
    "x": [ 0,  1],
    "c": [ 1,  1]
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.game.ship;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () { ship.power(move); });
    });

    key("space", function () { ship.fireBullet() });
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.timerId = setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
      }, 1000 / Asteroids.Game.FPS
    );

    this.bindKeyHandlers();
  };

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };
})(this);
