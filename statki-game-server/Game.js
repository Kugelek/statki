const axios = require("axios");
const gameSettings = require("./config/gameSettings");

const { Server } = require("./Server");
const { Ship } = require("./Ship");
const { MetheorRefiller } = require("./MetheorRefiller");
const { MissilesLocationUpdater } = require("./MissilesLocationUpdater");

const server = new Server();
let io = require("socket.io")(server.httpServer);

const refiller = new MetheorRefiller();
const missileUpdater = new MissilesLocationUpdater();

let ships = [];
let mines = [];
let missiles = [];
let metheors = [];

const emitHeartbeats = () => {
  io.sockets.emit("heartbeat", ships);
  io.sockets.emit("heartbeatmines", mines);
  io.sockets.emit("heartbeatmissiles", missiles);
  io.sockets.emit("heartbeatmetheors", metheors);
};

setInterval(emitHeartbeats, 33);
setInterval(() => missileUpdater.updateMissiles(missiles), 10);
setInterval(() => refiller.refillBoard(metheors), 3000);

io.sockets.on("connection", (socket) => {
  socket.on("start", (data) => {
    ships = ships.filter((ship) => ship.name !== data.name);
    ships.push(
      new Ship(
        socket.id,
        data.x,
        data.y,
        data.r,
        data.hp,
        data.name,
        data.points
      )
    );
  });

  socket.on("update", function (data) {
    let ship = ships.filter((el) => el.id === socket.id)[0];
    if (!ship) return;
    ship.x = data.x;
    ship.y = data.y;
    ship.r = data.r;
    ship.hp = data.hp;
    ship.name = data.name;
  });

  socket.on("missilesupdate", (missileListCandidate) => {
    missiles = missileListCandidate;
  });

  socket.on("createmine", (mineCandidate) => {
    //no invisible mines allowed
    if (mineCandidate.r <= 1) return;
    mines.push(mineCandidate);
  });

  socket.on("createmissile", (missileCandidate) => {
    missiles.push(missileCandidate);
  });

  socket.on("mineexploded", (explodedMineIndex) => {
    mines.splice(explodedMineIndex, 1);
  });

  socket.on("savepoints", (data) => {
    console.log(data.points);
    console.log(data.name);
    axios
      .patch(`http://localhost:8080/api/v1/User/${data.name}`, {
        actualScore: data.points,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  });

  socket.on("shipexploded", (explodedShipIndex) => {
    ships.splice(explodedShipIndex, 1);
  });

  const findKiller = (missileIndex) => {
    const killingMissile = missiles[missileIndex].ownerName;
    return ships.filter((ship) => ship.name === killingMissile)[0];
  };

  socket.on("hitenemy", function (data) {
    let killer;

    if (!ships[data.ind]) return;

    ships[data.ind].hp = data.hp;
    if (missiles[data.missileInd]) {
      killer = findKiller(data.missileInd);
    }

    missiles.splice(data.missileInd, 1);
    if (data.hp <= 0) {
      if (killer) killer.points += 1000;
      ships.splice(data.ind, 1);
    }
  });

  socket.on("hitmetheor", function (data) {
    let killer;

    if (!metheors[data.ind]) return;

    metheors[data.ind].hp = data.hp;
    metheors[data.ind].r = data.r;

    if (missiles[data.missileInd]) {
      killer = findKiller(data.missileInd);
    }

    missiles.splice(data.missileInd, 1);
    if (data.hp <= 0) {
      if (killer) killer.points += data.pointsToGet;
      metheors.splice(data.ind, 1);
    }
  });

  socket.on("disconnect", function () {
    console.log("disconnected");
  });
});
