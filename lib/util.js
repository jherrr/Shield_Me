(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var Util = Asteroids.Util = {};

  var dist = Util.dist = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

  var norm = Util.norm = function (vec) {
    return Util.dist([0, 0], vec);
  };

  var randomVec = Util.randomVec = function (length) {
    var x = Math.random() - 0.5;
    var y = Math.random() - 0.5;

    var preNorm = norm([x, y]);
    var mult = length / preNorm;

    return [mult * x, mult * y];
  }
})(this);

Function.prototype.inherits = function (BaseClass) {
  function Surrogate () {};
  Surrogate.prototype = BaseClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};
