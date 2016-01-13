(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }



  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];

    this.addAsteroids();

    this.score = 0;
    this.gameOver = false;
  };

  Game.SHIP_MOVES = [
    [ 0, -1],
    [-1,  0],
    [ 0,  1],
    [ 1,  0],
  ];

  Game.BG_COLOR = "#000000";
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 32;
  Game.NUM_ASTEROIDS = 10;

  Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Asteroids.Ship) {
      this.ships.push(object);
    } else if (object instanceof Asteroids.Trail) {
      this.trail = object;
    } else {
      throw "wtf?";
    }
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({ game: this }));
    }
  };

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship({
      pos: this.randomPosition(),
      game: this
    });

    this.add(ship);

    return ship;
  };

  Game.prototype.addTrail = function () {
    var trail = new Asteroids.Trail();

    this.add(trail);

    return trail;
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.ships, this.asteroids, this.bullets);
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1 == obj2) {
          // don't allow self-collision
          return;
        }

        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    });
  };

  Game.prototype.checkTrailCollisions = function () {

    var game = this;

    this.allObjects().forEach(function (obj) {
      if ( game.trail.isCollidedWith( obj ) ) {
        game.trail.collideWith(obj);
      }

    });
  };

  //bug, sometimes will wrap y axis
  Game.prototype.moveShip = function(delta) {

    var ships = this.ships;

    //give ship new velocity every so often
    ships.forEach( function (ship) {
      ship.updateTime( delta );
      var tSLCD = ship.timeSinceLastChangeDirection;
      var distFromBounds = 100;

      //prevent ship from moving out of bounds
      var pos = ship.pos;
      var moveIndices = [0, 1, 2, 3];

      if ( pos[0] < distFromBounds ) {
        moveIndices.splice(1,1);
        ship.resetXVel();
      } else if (pos[0] > Game.DIM_X - distFromBounds ){
        moveIndices.splice(3,1);
        ship.resetXVel();
      } else if ( pos[1] < distFromBounds ) {
        moveIndices.splice(0, 1);
        ship.resetYVel();
      } else if (pos[1] > Game.DIM_Y - distFromBounds ){
        moveIndices.splice(2, 1);
        ship.resetYVel();
      }

      if ( tSLCD > 1000 ) {
        ship.resetTime();

        var randomMove = Game.SHIP_MOVES[moveIndices[Math.floor(Math.random() * moveIndices.length)]];
        ship.power(randomMove);
      }
    });
  };

  var bgImg = new Image();
  bgImg.src = 'image/bg.jpg';

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    // ctx.fillStyle = Game.BG_COLOR;
    // ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    ctx.drawImage(bgImg, 0, 0, Game.DIM_X, Game.DIM_Y);

    ctx.font = "25px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score",25,50);
    ctx.fillText(this.score, 25, 75);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });

    if ( this.trail ) {
      this.trail.draw(ctx);
    }

  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.moveObjects = function (delta) {
    this.allObjects().forEach(function (object) {
      object.move(delta);
    });
  };

  Game.prototype.randomPosition = function () {
    var randomPositions = [
      [Game.DIM_X, Game.DIM_Y * Math.random()],
      [Game.DIM_X * Math.random(), Game.DIM_Y]
    ];

    return randomPositions[Math.floor(Math.random() * 2)];

    // return [
    //   Game.DIM_X * Math.random(),
    //   Game.DIM_Y * Math.random()
    // ];
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroids.Asteroid) {
      var idx = this.asteroids.indexOf(object);
      this.asteroids[idx] = new Asteroids.Asteroid({ game: this });
    } else if (object instanceof Asteroids.Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else {
      throw "wtf?";
    }
  };

  Game.prototype.step = function (delta) {
    this.checkTrailCollisions();
    this.moveShip(delta);

    this.moveObjects(delta);
    this.checkCollisions();

    if ( this.ships.length < 1) {
      this.gameOver = true;
    }

    this.score += 10;

  };

  Game.prototype.wrap = function (pos) {
    return [
      wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.DIM_Y)
    ];

    function wrap(coord, max) {
      if (coord < 0) {
        return max - (coord % max);
      } else if (coord > max) {
        return coord % max;
      } else {
        return coord;
      }
    }
  };
})();
