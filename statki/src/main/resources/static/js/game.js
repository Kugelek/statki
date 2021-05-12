let socket;
let ship;
let ships = [];
let mines = [];
let missiles = [];
let metheors = [];
let myPoints = 0;
let zoom = 1;
let gameEnded = false;
let bg;
/**
 * setup(), draw() keyPressed() are default P5.JS functions
 * dont change names or stuff before reading p5 docs, ty
 */

const reloadPage = () => window.location.reload();

function setup() {
  bg = loadImage("img/login-bg.jpg");
  createCanvas(window.innerWidth, window.innerHeight);
  socket = io.connect("http://192.168.99.100:3000");
  ship = new Ship(
    random(width),
    random(height),
    15,
    100,
    document.getElementById("mailvalue").innerText,
    0
  );

  socket.emit("start", {
    x: ship.position.x,
    y: ship.position.y,
    r: ship.r,
    hp: ship.hp,
    name: ship.name,
    points: ship.points,
    gameWidth: width,
    gameHeight: height,
  });

  socket.on("heartbeat", (verifiedShips) => {
    ships = verifiedShips;
  });

  socket.on("heartbeatmines", (verifiedMines) => {
    mines = verifiedMines;
  });
  socket.on("heartbeatmissiles", (verifiedMissiles) => {
    missiles = verifiedMissiles;
  });

  socket.on("heartbeatmetheors", (verifiedMetheors) => {
    metheors = verifiedMetheors;
  });
}

function draw() {
  if (!ship || gameEnded) {
    return;
  }
  background(0);
  background(bg);

  translate(width / 2, height / 2);
  let newzoom = 64 / ship.r;
  zoom = lerp(zoom, newzoom, 0.1);
  scale(zoom);
  translate(-ship.position.x, -ship.position.y);

  metheors.forEach((currentMetheor) => {
    fill(250, 215, 28);
    ellipse(
      currentMetheor.x,
      currentMetheor.y,
      currentMetheor.r * 2,
      currentMetheor.r * 2
    );
  });
  ships.forEach((currentShip) => {
    if (currentShip.name === ship.name) {
      ship.points = currentShip.points;
      ship.hp = currentShip.hp;
    }

    fill(0, 100, 100);
    ellipse(currentShip.x, currentShip.y, currentShip.r * 2, currentShip.r * 2);

    if (currentShip.name !== ship.name) {
      fill(255);
      textAlign(CENTER);
      textSize(4);
      text(
        currentShip.name,
        currentShip.x,
        currentShip.y + 1.5 * currentShip.r
      );

      rect(currentShip.x - 20, currentShip.y - 30, 40, 3, 5, 5, 5, 5);
      fill(0, 100, 100);
      rect(
        currentShip.x - 20,
        currentShip.y - 30,
        currentShip.hp / 2.5,
        3,
        5,
        5,
        5,
        5
      );
    }
  });
  for (var j = missiles.length - 1; j >= 0; j--) {
    fill("rgb(100%,0%,10%)");
    if (missiles[j].heartbeats > 0)
      ellipse(
        missiles[j].x + 4,
        missiles[j].y + 4,
        missiles[j].r,
        missiles[j].r
      );

    ships.forEach((singleShip, index) => {
      if (singleShip.name === ship.name) return;
      var d = p5.Vector.dist(
        createVector(singleShip.x, singleShip.y),
        createVector(missiles[j].x, missiles[j].y)
      );
      if (d < 2 * singleShip.r) {
        missiles.splice(j, 1);
        singleShip.hp -= 15;
        let data = {
          ind: index,
          missileInd: j,
          x: singleShip.x,
          y: singleShip.y,
          r: singleShip.r,
          hp: singleShip.hp - 15,
          name: singleShip.name,
          points: singleShip.points,
        };
        socket.emit("hitenemy", data);
      }
    });
    metheors.forEach((singleMetheor, index) => {
      if (!singleMetheor || !singleMetheor.x || !missiles[j]) return;
      var d = p5.Vector.dist(
        createVector(singleMetheor.x, singleMetheor.y),
        createVector(missiles[j].x, missiles[j].y)
      );
      if (d < 1.3 * singleMetheor.r) {
        missiles.splice(j, 1);
        singleMetheor.hp -= 15;
        singleMetheor.r -= 0.5;
        console.log("hitmetheor");
        let data = {
          ind: index,
          missileInd: j,
          x: singleMetheor.x,
          y: singleMetheor.y,
          r: singleMetheor.r - 0.5,
          hp: singleMetheor.hp - 15,
          pointsToGet: singleMetheor.pointsToGet,
        };
        socket.emit("hitmetheor", data);
      }
    });
  }

  mines.forEach((currMine, currMineIndex) => {
    fill("rgb(61%,72%,73%)");
    ellipse(currMine.x, currMine.y, currMine.r, currMine.r);
    let tempMine = new Mine(currMine.x, currMine.y, 9);

    if (!ship.didCollideWith("mine", tempMine)) return;

    mines.splice(currMineIndex, 1);
    ship.hp -= 25;

    socket.emit("mineexploded", currMineIndex);

    let hurtShip = {
      x: ship.position.x,
      y: ship.position.y,
      r: ship.r,
      hp: ship.hp,
      name: ship.name,
      points: ship.points,
    };
    if (ship && ship.hp > 0) {
      console.log(hurtShip);
      socket.emit("update", hurtShip);
    } else {
      const savedPlayer = {
        name: ship.name,
        points: ship.points,
      };

      background(0);
      fill(20, 20, 20);
      stroke(40, 40, 40);
      strokeWeight(2);
      rect(ship.position.x - 100, ship.position.y - 100, 200, 200, 5, 5, 5, 5);

      fill(240, 240, 240);
      textAlign(CENTER);
      textSize(16);
      text("GAME OVER", ship.position.x, ship.position.y - 20);

      textSize(10);
      const nickname = document.getElementById("mailvalue").innerText;

      text(`${nickname}`, ship.position.x, ship.position.y);
      textSize(5);
      text(`SCORE ${ship.points}`, ship.position.x, ship.position.y + 15);

      button = createButton("Try again!");
      button.position(ship.position.x + 200, ship.position.y + 300);
      button.mousePressed(reloadPage);

      ships.splice(ships.indexOf(ship), 1);
      ship = null;
      gameEnded = true;

      socket.emit("savepoints", savedPlayer);
      socket.emit("shipexploded", ships.indexOf(ship));
    }
  });

  if (ship.hp > 0) {
    ship.show();
  }

  if (mouseIsPressed) {
    ship.update();
  }
  ship.constrain();

  let data = {
    x: ship.position.x,
    y: ship.position.y,
    r: ship.r,
    hp: ship.hp,
    name: ship.name,
    points: ship.points,
  };
  socket.emit("update", data);
}

function keyPressed() {
  if (!ship) return;

  if (keyCode === 32) {
    missile = new Missile(ship.position.x, ship.position.y, 4, ship.name, 50);
    missiles.push(missile);
    let data = {
      x: missile.x,
      y: missile.y,
      r: missile.r,
      ownerName: missile.ownerName,
      heartbeats: missile.heartbeats,
      destinationVectorX: missile.destinationVectorX,
      destinationVectorY: missile.destinationVectorY,
    };
    socket.emit("createmissile", data);
  }

  if (keyCode === ENTER) {
    mine = new Mine(ship.position.x + 20, ship.position.y + 20, 9);
    var data = {
      x: ship.position.x + 20,
      y: ship.position.y + 20,
      r: 9,
    };

    socket.emit("createmine", data);
  }
}
