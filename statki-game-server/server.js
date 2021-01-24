const axios = require('axios');

let ships = [];
let mines = [];
let missiles = [];
let metheors = [];
let gameSettings = {
  width: 0,
  height: 0
}


class Ship {
  constructor(id, x, y, r, hp, name, points){
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
    this.hp = hp;
    this.name = name;
    this.points = points;
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

const refillMetheors = () => {
  const refillAmount = 20 - metheors.length;
  for(var i = 0; i < refillAmount; i++){
    let randomRadius = Math.random() * (19 - 10) + 10;

    metheors.push({
      // x: Math.random() * gameSettings.width/4,
      // y: Math.random() * gameSettings.height/4,
      x: Math.random() * 500 -300,
      y: Math.random() * 300 - 200,
      r: randomRadius,
      hp: 100,
      pointsToGet: randomRadius * 10
    })
  }

}
function heartbeat() {
  io.sockets.emit('heartbeat', ships);
  io.sockets.emit('heartbeatmines', mines);
  io.sockets.emit('heartbeatmissiles', missiles);
  io.sockets.emit('heartbeatmetheors', metheors);
 
}

setInterval(heartbeat, 33);
setInterval(updateMissiles, 10);
setInterval(refillMetheors, 3000)

io.sockets.on(
  'connection',
  function(socket) {
    console.log('new client: ' + socket.id);

    socket.on('start', function(data) {
      console.log("starcik", socket.id + ' ' + data.x + ' ' + data.y + ' ' + data.r);
      gameSettings = {
        width: data.gameWidth,
        height: data.gameHeight
      }
      ships.push(new Ship(socket.id, data.x, data.y, data.r, data.hp, data.name, data.points));
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
        // ship.points = data.points;
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
        ownerName: "",
        heartbeats: "",
        destinationVectorX: "",
        destinationVectorY: ""
      };
      console.log(data);
      missile.x = data.x;
      missile.y = data.y;
      missile.r = data.r;
      missile.ownerName = data.ownerName;
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
      let killer;
      let killingMissile;
      if(ships[data.ind]){
        ships[data.ind].hp = data.hp;
       // missiles.forEach(m => console.log(m.ownerName));
        if(missiles[data.missileInd]){
          killingMissile = missiles[data.missileInd].ownerName;
          killer = ships.filter(s => s.name === killingMissile )[0];
        }
        missiles.splice(data.missileInd, 1);
        if(data.hp <= 0){
          if(killer)
            killer.points += 1000;
          ships.splice(data.ind, 1);
          console.log("hit enemy destroyed");
        //   console.log("KP", ships.filter(s => s.name === missiles[data.missileInd].ownerName)[0].points);
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
