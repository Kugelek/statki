
let socket;
let ship;
let ships = [];
let mines = [];
let missiles = [];
let zoom = 1;
let xd = "xd";
let gameEnded = false;

/**
 * setup(), draw() keyPressed() are default P5.JS functions
 * dont change names or stuff before reading p5 docs, ty
 */
const reloadPage = ( ) => window.location.reload();

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
    if(!ship || gameEnded){
        return;
    }

    background(0);
    //console.log(ship.position.x, ship.position.y);

    translate(width / 2, height / 2);
    let newzoom = 64 / ship.r;
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);
    translate(-ship.position.x, -ship.position.y);

    ships.forEach(currentShip => {
        if (currentShip.id.substring(2, currentShip.id.length) === socket.id){
            return;
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
            name: ship.name
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
            const nickname = document.getElementById("test").innerText;
            text( `${nickname}`, ship.position.x, ship.position.y);
            textSize(5);
            text( "SCORE: 1000", ship.position.x, ship.position.y+10);

            button = createButton('Try again!');
            button.position(ship.position.x, ship.position.y+25);
            button.mousePressed(reloadPage);

            ships.splice(ships.indexOf(ship), 1);
            ship = null;
            gameEnded = true;
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
        name: ship.name
    };
    socket.emit('update', data);
}



function keyPressed() {
    if(!ship)
        return;
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
