(function () {
  if (typeof ShieldME === "undefined") {
    window.ShieldME = {};
  }

  function randomColor() {
    var hexDigits = "0123456789ABCDEF";

    var color = "#";
    for (var i = 0; i < 3; i ++) {
      color += hexDigits[Math.floor((Math.random() * 16))];
    }

    return color;
  }

  //points are in [x, y, timeTillErased] format
  var Trail = ShieldME.Trail = function (options) {
    this.listOfPoints = [];
    this.radius = 7;
  };

  Trail.prototype.add = function ( pos ) {

    var lastPos = this.listOfPoints[this.listOfPoints.length-1];
    var trailResolution = 30;

    if ( lastPos ) {
      var incrX = (pos[0] - lastPos[0])/trailResolution;
      var incrY = (pos[1] - lastPos[1])/trailResolution;
      var time = performance.now();
      // debugger;
      var x = lastPos[0];
      var y = lastPos[1];
      idx = 0;
      while ( idx < trailResolution ) {
        x += incrX;
        y += incrY;

        this.listOfPoints.push([x, y, time]);
        idx += 1;
      }
    } else {
        pos.push(performance.now());
        this.listOfPoints.push(pos);
    }

    // debugger;
  };

  Trail.prototype.isCollidedWith = function (obj) {
    var collidedWith = false;
    var that = this;

    this.listOfPoints.forEach( function ( point ) {
      var dist = ShieldME.Util.dist(point, obj.pos);
      var collisionDist = obj.radius + that.radius;

      if ( dist < collisionDist ) {
        console.log("overlap");
        collidedWith = true;
      }

    });

    return collidedWith;
  };

  Trail.prototype.collideWith = function ( obj ) {
    if ( ! (obj instanceof ShieldME.Ship) ) {
      obj.remove();
    }
  };

  Trail.prototype.draw = function (ctx) {
    if ( this.listOfPoints.length > 0 ) {
      ctx.beginPath();
      ctx.moveTo(this.listOfPoints[0][0], this.listOfPoints[0][1]);

      // var trail = this;
      // this.listOfPoints.forEach ( function ( pt ) {
      //   ctx.lineTo(pt[0], pt[1]);
      // }.bind(trail));

      var idx = 0;

      while( idx < this.listOfPoints.length ) {
        var pt = this.listOfPoints[idx];

        if ( performance.now() - pt[2] > 100 ) {

          this.listOfPoints.splice(idx, 1);
        } else {
            ctx.lineTo(pt[0], pt[1]);
            idx += 1;
        }
      }

      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 7;
      ctx.stroke();
    };

  }
})();
