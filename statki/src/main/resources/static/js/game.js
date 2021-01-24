
let socket;
let ship;
let ships = [];
let mines = [];
let missiles = [];
let zoom = 1;
let gameEnded = false;
let bg;
/**
 * setup(), draw() keyPressed() are default P5.JS functions
 * dont change names or stuff before reading p5 docs, ty
 */

const reloadPage = ( ) => window.location.reload();

function setup() {
    bg = loadImage('img/login-bg.jpg');
    createCanvas(window.innerWidth, window.innerHeight);
    socket = io.connect('http://localhost:3000');
    ship = new Ship(random(width), random(height), 15, 100, document.getElementById("mailvalue").innerText, 0);

    let data = {
        x: ship.position.x,
        y: ship.position.y,
        r: ship.r,
        hp: ship.hp,
        name: ship.name,
        points: ship.points
    };
    socket.emit('start', data);

    socket.on('heartbeat', function(data) {
        ships = data;
    });

    socket.on('heartbeatmines', function(data) {
        //console.log(data);
        mines = data;
    });
    socket.on('heartbeatmissiles', function(data) {
        //console.log(data);
        missiles = data;
    });


    socket.on('heartbeatmetheors', function(data) {
        //console.log(data);
        metheors = data;
    });



}

function draw() {
    if(!ship || gameEnded){
        return;
    }
    background(0);
    background(bg);

    translate(width / 2, height / 2);
    let newzoom = 64 / ship.r;
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);
    translate(-ship.position.x, -ship.position.y);

    ships.forEach(currentShip => {
        // if (currentShip.id.substring(2, currentShip.id.length) === socket.id){
        //     console.log("DONEcasfasfs");
        //     text("Punkty xd"+currentShip.name, currentShip.x - 500, currentShip.y - 50);
        //     return;
        // }
        if (currentShip.name === ship.name){
            text("Points "+currentShip.points, currentShip.x - 100, currentShip.y+45);
        }

        fill(0, 100, 100);
        ellipse(
            currentShip.x,
            currentShip.y,
            currentShip.r * 2,
            currentShip.r * 2);

        fill(255);
        textAlign(CENTER);
        textSize(4);
        text( currentShip.name, currentShip.x, currentShip.y + 1.5 * currentShip.r);


        rect(currentShip.x-20, currentShip.y-30, 40, 3, 5, 5, 5, 5);
        fill(0, 100, 100);
        rect(currentShip.x-20, currentShip.y-30, currentShip.hp/2.5, 3, 5, 5, 5, 5);

    });
    for(var j = missiles.length -1; j >=0; j--){
        fill('rgb(100%,0%,10%)');
        // ellipse(missiles[i].pos.x+50, missiles[i].pos.y+50, missiles[i].r, misssiles[i].r);
       // ellipse(missiles[j].x+4, missiles[j].y+4, missiles[j].r, missiles[j].r), 20;

        ellipse(missiles[j].x+4, missiles[j].y+4, missiles[j].r, missiles[j].r);

        // if (!ship.hitByMissile(missiles[j]))
        //     return;

        ships.forEach((singleShip, index) => {
            if(singleShip.name === ship.name)
                return;
            var d = p5.Vector.dist(createVector(singleShip.x, singleShip.y), createVector(missiles[j].x, missiles[j].y));
            console.log(d+"   odl   ");
            if (d <   2* singleShip.r) {
                // var sum = PI * this.r * this.r + PI * other.r * other.r;
                // this.r = sqrt(sum / PI);
                //this.r += other.r;
                //missiles[j].heartbeats = 0;
                missiles.splice(j,1);
                singleShip.hp -= 15;
               // singleShip.hp -=15;
                console.log('hit');
                let data = {
                    ind: index,
                    missileInd: j,
                    x: singleShip.x,
                    y: singleShip.y,
                    r: singleShip.r,
                    hp: singleShip.hp - 15,
                    name: singleShip.name,
                    points: singleShip.points
                };
                socket.emit('hitenemy', data);

                //return true;
            }
        })

        // missiles.splice(currMineIndex, 1);

       // if(missiles[j].heartbeats >= 0){
           // let  mis = new Missile(missiles[j].x, missiles[j].y, missiles[j].r, missiles[j].heartbeats);
            // missiles[j].update();
           // mis.update();

           //  missiles[j].x += 3;
           //  missiles[j].y += 3;
           //  missiles[j].heartbeats -= 1;

           // console.log("testupdated", missiles[j].heartbeats);

           //  let data = {
           //      ind: j,
           //      x: mis.x -3,
           //      y: mis.y - 3,
           //      r: mis.r,
           //      heartbeats: mis.heartbeats -1
           //  }
            // socket.emit("missilesupdate", data);
        // }else{
        //     missiles.splice(j, 1);
        //     console.log("usunieto",j);
        // }


      //  socket.emit("missiledelete", missile);
    }
    // socket.emit("missilesupdate", missiles);

    mines.forEach((currMine, currMineIndex) => {
        fill('rgb(61%,72%,73%)');
        ellipse(currMine.x, currMine.y, currMine.r, currMine.r);
        let tempMine = new Mine(currMine.x, currMine.y, 9);

        if (!ship.steppedOnMine(tempMine))
            return;
        mines.splice(currMineIndex, 1);
        ship.hp -=25;

        console.log('stepped');
            //         //ships.splice(i, 1);

        socket.emit('mineexploded', currMineIndex);

        let hurtShip = {
            x: ship.position.x,
            y: ship.position.y,
            r: ship.r,
            hp: ship.hp,
            name: ship.name,
            points: ship.points,
        };
        if(ship && ship.hp > 0){
            console.log(hurtShip);
            socket.emit('update', hurtShip);
        }else{
            background(0);
            fill(20, 20, 20);
            stroke(40,40,40);
            strokeWeight(2);
            rect(ship.position.x - 100, ship.position.y - 100, 200, 200, 5,5,5,5);

            fill(240, 240, 240);
            textAlign(CENTER);
            textSize(16);
            text( "GAME OVERRR", ship.position.x, ship.position.y-20);

            textSize(10);
            const nickname = document.getElementById("mailvalue").innerText;

            text( `${nickname}`, ship.position.x, ship.position.y);
            textSize(5);
            text( "SCORE: 1000", ship.position.x, ship.position.y+10);

            button = createButton('Try again!');
            button.position(ship.position.x, ship.position.y+25);
            button.mousePressed(reloadPage);

            ships.splice(ships.indexOf(ship), 1);
            ship = null;
            gameEnded = true;
            socket.emit("savepoints", hurtShip);
            socket.emit("shipexploded", ships.indexOf(ship));

        }

    });

    if(ship.hp > 0){
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
        points: ship.points
    };
    socket.emit('update', data);

}



function keyPressed() {
    if(!ship)
        return;

    if (keyCode === 32) {
        //missile = new Missile(blob.pos.x, blob.pos.y, 6);
        // missile = new Missile(random(width), random(height), random(8, 24));
        missile = new Missile(ship.position.x, ship.position.y, 4, ship.name,50);
        missiles.push(missile);
        let data = {
            x: missile.x,
            y: missile.y,
            r: missile.r,
            ownerName: missile.ownerName,
            heartbeats: missile.heartbeats,
            destinationVectorX: missile.destinationVectorX,
            destinationVectorY: missile.destinationVectorY
        };
        socket.emit('createmissile', data);
        // console.log(missiles);
        // console.log(blobs);
        console.log('spacja');
    }

    if(keyCode === ENTER){
        mine = new Mine(ship.position.x+20, ship.position.y+20, 9);
        console.log(mine);
        var data = {
            x: ship.position.x+20,
            y: ship.position.y+20,
            r: 9
        }
        console.log(data);
        // mines.push(mine);
        socket.emit('createmine', data);
    }
}
