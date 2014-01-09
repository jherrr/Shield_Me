(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Asteroids.Ship(this.randomPosition(), this);

    this.addAsteroids(Game.NUM_ASTEROIDS)
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 5;
  Game.BLACK = "#000";

  Game.prototype.add = function (object) {
    if (object.constructor == Asteroids.Asteroid) {
      this.asteroids.push(object);
    } else if (object.constructor == Asteroids.Bullet) {
      this.bullets.push(object);
    } else {
      throw "wtf?";
    }
  }

  Game.prototype.addAsteroids = function (numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      var asteroid = Asteroids.Asteroid.randomAsteroid(this);
      this.asteroids.push(asteroid);
    }
  };

  Game.prototype.allObjects = function () {
    return [this.ship].concat(this.asteroids).concat(this.bullets);
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    });
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BLACK;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0)
      || (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) { object.move(); });
  };

  Game.prototype.randomPosition = function () {
    return [Game.DIM_X * Math.random(), Game.DIM_Y * Math.random()];
  }

  Game.prototype.remove = function (object) {
    if (object.constructor == Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object.constructor == Asteroids.Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
    } else {
      throw "wtf?";
    }
  }

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };
})(this);
