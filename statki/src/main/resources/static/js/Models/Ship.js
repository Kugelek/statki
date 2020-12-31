class Ship {

    constructor(x, y, r){
        this.position = createVector(x, y);
        this.r = r;
        this.velocity = createVector(0, 0);
    }

    update(){
        let updatedVelocity = createVector(mouseX - width / 2, mouseY - height / 2);
        updatedVelocity.div(50);
        updatedVelocity.limit(3);
        this.velocity.lerp(updatedVelocity, 0.2);
        this.position.add(this.velocity);
    }
    constrain(){
        ship.position.x = constrain(ship.position.x, -width / 4, width / 4);
        ship.position.y = constrain(ship.position.y, -height / 4, height / 4);
    }

    show() {
        fill(255);
        ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
    };
}