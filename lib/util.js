var Asteroids = (function (Asteroids) {
  var Util = Asteroids.Util = {};
  Util.dist = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };
  Util.norm = function (vec) {
    return Util.dist([0, 0], vec);
  };

  return Asteroids;
})(Asteroids || {});

Function.prototype.inherits = function (BaseClass) {
  function Surrogate () {};
  Surrogate.prototype = BaseClass.prototype;
  this.prototype = new Surrogate();
};
