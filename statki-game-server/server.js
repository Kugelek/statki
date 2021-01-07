let ships = [];
let mines = [];

class Ship {
  constructor(id, x, y, r){
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
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
//  console.log('emitted', ships);
}

setInterval(heartbeat, 33);

io.sockets.on(
  'connection',
  function(socket) {
    console.log('new client: ' + socket.id);

    socket.on('start', function(data) {
      console.log("starcik", socket.id + ' ' + data.x + ' ' + data.y + ' ' + data.r);
      ships.push(new Ship(socket.id, data.x, data.y, data.r));
    });

    socket.on('update', function(data) {
      // console.log(socket.id + " " + data.x + " " + data.y + " " + data.r);
      // console.log("XD updejcik");
      // console.log(ships);
      let ship = ships.filter(el => el.id === socket.id)[0];
      ship.x = data.x;
      ship.y = data.y;
      ship.r = data.r;
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
    });

    socket.on('mineexploded', function(data) {
      mines.splice(data,1);
      // var mine = {
      //   x: "",
      //   y: "",
      //   r: ""
      // };
      // console.log(data);
      // mine.x = data.x;
      // mine.y = data.y;
      // mine.r = data.r;

      // mines.push(mine);
    });

    socket.on('disconnect', function() {
      console.log('disconnected');
    });
  }
);
