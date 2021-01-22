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

const updateMissiles = async () =>{
  if(missiles.length){
    
    missiles = missiles.filter(el => el.heartbeats > 0);
      missiles.forEach((missile, ind) =>{
      //  if(missile.heartbeats <= 0){
       //   missile.splice(ind,1);
       //   console.log('skasowano');
       // }
         
       // missile.x += missile.destinationVectorX/50;
     
      //  console.log("desti", missile.destinationVectorX);
      //  console.log(missile.destinationVectorY);
       //missile.x +=1;
      //  missile.x += missile.destinationVectorX / 100;
      //   missile.y += missile.destinationVectorY/100;
      missile.x += missile.destinationVectorX/100;
      missile.y += missile.destinationVectorY/100;
        //missile.y += 1;
        missile.heartbeats -=0.3;
      });
    
  }
  
} 

function heartbeat() {
  io.sockets.emit('heartbeat', ships);
  io.sockets.emit('heartbeatmines', mines);
  io.sockets.emit('heartbeatmissiles', missiles);
}

setInterval(heartbeat, 33);
setInterval(updateMissiles, 10);

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
    socket.on('missilesupdate', function(data) {
      if(data.length)
        console.log("succes", data[0]);
      missiles = data;
      // if(!data.j)
      //   return;
      // let currMissile = missiles[data.j];
      // currMissile.x = data.x;
      // currMissile.y = data.y;
      // currMissile.r = data.r;
      // currMissile.heartbeats = data.heartbeats;
      // //  currMissile = {
      // //   x: data.x,
      // //   y: data.y,
      // //   r: data.r,
      // //   heartbeats: data.heartbeats
      // // };
      // console.log("TEST", data.j);
      // console.log(missiles[data.j]);
      // console.log(currMissile);


      // console.log(socket.id + " " + data.x + " " + data.y + " " + data.r);
      // console.log("XD updejcik");
      // console.log(ships);
      // let ship = ships.filter(el => el.id === socket.id)[0];
      // if(ship){
      //   ship.x = data.x;
      //   ship.y = data.y;
      //   ship.r = data.r;
      //   ship.hp = data.hp;
      //   ship.name = data.name;
      // }
    
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

      socket.on('createmissile', function(data) {
      let missile = {
        x: "",
        y: "",
        r: "",
        heartbeats: "",
        destinationVectorX: "",
        destinationVectorY: ""
      };
      console.log(data);
      missile.x = data.x;
      missile.y = data.y;
      missile.r = data.r;
      missile.heartbeats = data.heartbeats;
      missile.destinationVectorX = data.destinationVectorX;
      missile.destinationVectorY = data.destinationVectorY;

      missiles.push(missile);
      // console.log("created");
      // console.log(mine);
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
    socket.on('hitenemy', function(data) {
      if(ships[data.ind]){
        ships[data.ind].hp = data.hp;
        missiles.splice(data.missileInd, 1);
        if(data.hp <= 0){
          ships.splice(data.ind, 1);
          console.log("hit enemy destroyed");
        }
       
      }
      // ships.splice(data,1);
      console.log("hit enemy");
      //console.log(ships);
      //update score when game ends for user


    });
   

    socket.on('disconnect', function() {
      console.log('disconnected');
    });
  }
);
