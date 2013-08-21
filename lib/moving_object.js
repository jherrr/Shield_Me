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

  var MovingObject = Asteroids.MovingObject = function (startPos, vel, radius, color) {
    this.color = color;
    this.pos = startPos;
    this.radius = radius;
    this.vel = vel;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    ctx.fill();
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  };

  // TODO: what about if object slips off bounds?
  MovingObject.prototype.move = function () {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
  };

  return Asteroids;
})(Asteroids || {});
