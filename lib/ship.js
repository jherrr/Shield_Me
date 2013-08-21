var Asteroids = (function (Asteroids) {
  var Ship = Asteroids.Ship = function (startPos, game) {
    Asteroids.MovingObject.call(this, startPos, [0, 0], Ship.RADIUS, Ship.RED);
  };
  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.RADIUS = 15;
  Ship.RED = "#F00";  

  return Asteroids;
})(Asteroids || {});
