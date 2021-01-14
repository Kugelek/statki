
let socket;
let ship;
let ships = [];
let mines = [];
let missiles = [];
let zoom = 1;
let xd = "xd";

/**
 * setup(), draw() keyPressed() are default P5.JS functions
 * dont change names or stuff before reading p5 docs, ty
 */

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    socket = io.connect('http://localhost:3000');
    ship = new Ship(random(width), random(height), 15, 100, document.getElementById("test").innerText);

    let data = {
        x: ship.position.x,
        y: ship.position.y,
        r: ship.r,
        hp: ship.hp,
        name: ship.name
    };
    socket.emit('start', data);

    socket.on('heartbeat', function(data) {
        ships = data;
    });

    socket.on('heartbeatmines', function(data) {
        //console.log(data);
        mines = data;
    });
    socket.on('heartbeatmetheors', function(data) {
        //console.log(data);
        metheors = data;
    });



}

function draw() {
    background(0);
    //console.log(ship.position.x, ship.position.y);

    translate(width / 2, height / 2);
    let newzoom = 64 / ship.r;
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);
    translate(-ship.position.x, -ship.position.y);

    ships.forEach(currentShip => {
        if (currentShip.id.substring(2, currentShip.id.length) === socket.id)
            return;
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

    mines.forEach((currMine, currMineIndex) => {
        fill('rgb(61%,72%,73%)');
        ellipse(currMine.x, currMine.y, currMine.r, currMine.r);
        let tempMine = new Mine(currMine.x, currMine.y, 9);

        if (!ship.steppedOnMine(tempMine))
            return;
        mines.splice(currMineIndex, 1);
        ship.hp -=25;
        console.log('stepped');
            //         // blobs.splice(i, 1);
            //         // var data = {
            //         //   x: blob.pos.x,
            //         //   y: blob.pos.y,
            //         //   r: 9
            //         // }
            //         // mines.push(mine);
        socket.emit('mineexploded', currMineIndex);
        let hurtShip = {
            x: ship.position.x,
            y: ship.position.y,
            r: ship.r,
            hp: ship.hp,
            name: ship.name
        };
        console.log(hurtShip);
        socket.emit('update', hurtShip);

    });
    // for(var k = mines.length -1; k >=0; k--){
    //     fill('rgb(61%,72%,73%)');
    //     ellipse(mines[k].x, mines[k].y, mines[k].r, mines[k].r);
    //
    //     var tempMine = new Mine(mines[k].x, mines[k].y, 9);
    //     if (blob.stepsOnMine(tempMine)) {
    //         mines.splice(k, 1);
    //         blob.hp -=25;
    //         console.log('stepped');
    //         // blobs.splice(i, 1);
    //         // var data = {
    //         //   x: blob.pos.x,
    //         //   y: blob.pos.y,
    //         //   r: 9
    //         // }
    //         console.log(data);
    //         // mines.push(mine);
    //         socket.emit('mineexploded', k);
    //         var hurtblob = {
    //             x: blob.pos.x,
    //             y: blob.pos.y,
    //             r: blob.r,
    //             hp: blob.hp
    //         };
    //         socket.emit('update', hurtblob);
    //     }
    //
    // }

    ship.show();
    if (mouseIsPressed) {
        ship.update();
    }
    ship.constrain();

    let data = {
        x: ship.position.x,
        y: ship.position.y,
        r: ship.r,
        hp: ship.hp,
        name: ship.name
    };
    socket.emit('update', data);
}

function keyPressed() {
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
