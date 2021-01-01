
let socket;
let ship;
let ships = [];
let zoom = 1;

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
