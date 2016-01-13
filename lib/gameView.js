(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();

    this.trail = this.game.addTrail();

    this.mouseDownTrue = false;
  };

  GameView.MOVES = {
    "w": [ 0, -1],
    "a": [-1,  0],
    "s": [ 0,  1],
    "d": [ 1,  0],
  };

  GameView.prototype.bindKeyHandlers = function () {
    // var ship = this.ship;
    //
    // Object.keys(GameView.MOVES).forEach(function (k) {
    //   var move = GameView.MOVES[k];
    //   key(k, function () { ship.power(move); });
    // });
    //
    // key("space", function () { ship.fireBullet() });

    var canvas = document.getElementsByTagName("canvas")[0];

    addEvent(document, 'mousedown', this.handleMouseDown.bind(this));
    addEvent(document.getElementsByTagName("canvas")[0], 'mousemove', this.handleMouseMove.bind(this));
    addEvent(document.getElementsByTagName("canvas")[0], 'mouseup', this.handleMouseUp.bind(this));
  };

  GameView.prototype.handleMouseDown = function (e) {

    console.log('mousedown');
    this.mouseDownTrue = true;
    var canvas = document.getElementsByTagName("canvas")[0];
    var posObj = getMousePos(canvas, e);
    this.prevPos = [posObj.x, posObj.y];
  };

  GameView.prototype.handleMouseMove = function(e) {
    var canvas = document.getElementsByTagName("canvas")[0];

    if (this.mouseDownTrue) {

      var posObj = getMousePos(canvas,e);
      var pos = [posObj.x, posObj.y];

      this.trail.add(pos);
    }
  };

  GameView.prototype.handleMouseUp = function(e) {
    this.mouseDownTrue = false;
  };

  function getMousePos(canvas, evt) {
     var rect = canvas.getBoundingClientRect();
     return {
       x: evt.clientX - rect.left,
       y: evt.clientY - rect.top
     };
  }

  function addEvent(object, event, method) {
    if (object.addEventListener)
      object.addEventListener(event, method, false);
    else if(object.attachEvent)
      object.attachEvent('on'+event, function(){ method(window.event) });
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    this.lastTime = 0;
    //start the animation
    requestAnimationFrame(this.animate.bind(this));

  };

  GameView.prototype.animate = function(time){
    var timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    //every call to animate requests causes another call to animate
    if ( !this.game.gameOver ) {
      requestAnimationFrame(this.animate.bind(this));
    } else {

      var ctx = this.ctx;
      ctx.font = "50px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("Game Over", 400, 300);
    }

  }
})();
