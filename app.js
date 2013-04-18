$(function () {
  var canvas = $("<canvas width='" + Asteroids.Game.DIM_X + 
                 "' height='" + Asteroids.Game.DIM_Y + "'></canvas>");
  $('body').append(canvas);

  var ctx = canvas.get(0).getContext("2d");
  new Asteroids.Game(ctx).start();
});
