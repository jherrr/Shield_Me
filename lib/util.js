(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var Util = Asteroids.Util = {};

  var dir = Util.dir = function (vec) {
    var norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  };

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

    var vec = [x, y];
    return Util.scale(vec, length / Util.norm(vec));
  };

  var scale = Util.scale = function (vec, m) {
    return [vec[0] * m, vec[1] * m];
  };
})(this);

Function.prototype.inherits = function (BaseClass) {
  function Surrogate () {};
  Surrogate.prototype = BaseClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};
