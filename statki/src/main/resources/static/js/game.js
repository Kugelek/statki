
let socket;
let ship;
let ships = [];
let mines = [];
let missiles = [];
let zoom = 1;

/**
 * setup() and draw() are default P5.JS functions
 * dont change names or stuff before reading p5 docs, ty
 */

function setup() {
    createCanvas(1500, 700);
    //createCanvas(document.height / 1.5, document.width / 1.5);

    socket = io.connect('http://localhost:3000');
    ship = new Ship(random(width), random(height), random(8, 24));

    let data = {
        x: ship.position.x,
        y: ship.position.y,
        r: ship.r
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
    console.log(ship.position.x, ship.position.y);

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

        text(currentShip.id,
            currentShip.x,
            currentShip.y + currentShip.r);

    });

    mines.forEach((currMine, currMineIndex) => {
        fill('rgb(61%,72%,73%)');
        ellipse(currMine.x, currMine.y, currMine.r, currMine.r);
        let tempMine = new Mine(currMine.x, currMine.y, 9);

        if (!blob.stepsOnMine(tempMine))
            return;
        mines.splice(currMineIndex, 1);
        blob.hp -=25;
        console.log('stepped');
            //         // blobs.splice(i, 1);
            //         // var data = {
            //         //   x: blob.pos.x,
            //         //   y: blob.pos.y,
            //         //   r: 9
            //         // }
            //         // mines.push(mine);
        socket.emit('mineexploded', k);
        let hurtblob = {
            x: blob.pos.x,
            y: blob.pos.y,
            r: blob.r,
            hp: blob.hp
        };
        socket.emit('update', hurtblob);

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
        r: ship.r
    };
    socket.emit('update', data);
}

function keyPressed() {
    if(keyCode === ENTER){
        mine = new Mine(ship.position.x+20, ship.position.y+20, random(8, 15));
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
