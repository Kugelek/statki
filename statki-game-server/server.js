const axios = require('axios');

let ships = [];
let mines = [];
let missiles = [];


class Ship {
  constructor(id, x, y, r, hp, name){
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
    this.hp = hp;
    this.name = name;
  }
}

let express = require('express');
let app = express();
let server = app.listen(process.env.PORT || 3000,() => {
  console.log('listening at http://' + server.address().address + ':' + server.address().port);
});

let io = require('socket.io')(server);

function heartbeat() {
  io.sockets.emit('heartbeat', ships);
  io.sockets.emit('heartbeatmines', mines);
  io.sockets.emit('heartbeatmissiles', missiles);
}

setInterval(heartbeat, 33);

io.sockets.on(
  'connection',
  function(socket) {
    console.log('new client: ' + socket.id);

    socket.on('start', function(data) {
      console.log("starcik", socket.id + ' ' + data.x + ' ' + data.y + ' ' + data.r);
      ships.push(new Ship(socket.id, data.x, data.y, data.r, data.hp, data.name));
    });

    socket.on('update', function(data) {
      // console.log(socket.id + " " + data.x + " " + data.y + " " + data.r);
      // console.log("XD updejcik");
      // console.log(ships);
      let ship = ships.filter(el => el.id === socket.id)[0];
      if(ship){
        ship.x = data.x;
        ship.y = data.y;
        ship.r = data.r;
        ship.hp = data.hp;
        ship.name = data.name;
      }
    
    });

    socket.on('createmine', function(data) {
      var mine = {
        x: "",
        y: "",
        r: ""
      };
      console.log(data);
      mine.x = data.x;
      mine.y = data.y;
      mine.r = data.r;

      mines.push(mine);
      console.log("created");
      console.log(mine);
    });

    socket.on('mineexploded', function(data) {
      mines.splice(data,1);
      console.log("deleted mine");
    });

    socket.on('savepoints', function(data) {
      axios
      .patch(`http://localhost:8080/api/v1/User/${data.name}`, {
        actualScore: 9000
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    
    });
   
    socket.on('shipexploded', function(data) {

      ships.splice(data,1);
      console.log("deleted ship");
      console.log(ships);
      //update score when game ends for user


    });
   

    socket.on('disconnect', function() {
      console.log('disconnected');
    });
  }
);
