var Asteroids = (function (Asteroids) {
  var Ship = Asteroids.Ship = function (startPos, game) {
    Asteroids.MovingObject.call(this, startPos, [0, 0], Ship.RADIUS, Ship.RED);
  };
  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.power = function (dx, dy) {
    this.vel[0] += dx;
    this.vel[1] += dy;
  };

  Ship.RADIUS = 15;
  Ship.RED = "#F00";  

  return Asteroids;
})(Asteroids || {});
