class Ship {

    constructor(x, y, r, hp, name, points){
        this.position = createVector(x, y);
        this.r = r;
        this.velocity = createVector(0, 0);
        this.hp = hp;
        this.name = name;
        this.points = points;
    }

    update(){
        let updatedVelocity = createVector(mouseX - width / 2, mouseY - height / 2);
        updatedVelocity.div(50);
        updatedVelocity.limit(3);
        this.velocity.lerp(updatedVelocity, 0.2);
        this.position.add(this.velocity);
    }

    steppedOnMine(other) {
        var d = p5.Vector.dist(this.position, other.position);
        if (d < 2 * other.r) {

            // var sum = PI * this.r * this.r + PI * other.r * other.r;
            // this.r = sqrt(sum / PI);
            //this.r += other.r;
            return true;
        } else {
            return false;
        }
    };
    hitByMissile(missile){
        var d = p5.Vector.dist(this.position, createVector(missile.x, missile.y));
        if (d < 2 * missile.r) {
            // var sum = PI * this.r * this.r + PI * other.r * other.r;
            // this.r = sqrt(sum / PI);
            //this.r += other.r;
            return true;
        } else {
            return false;
        }
    }

    constrain(){
        ship.position.x = constrain(ship.position.x, -width / 4, width / 4);
        ship.position.y = constrain(ship.position.y, -height / 4, height / 4);
    }

    show() {
        fill(255);
        ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
        stroke(133, 133, 133);
        const vec = createVector(mouseX - width / 2, mouseY - height / 2);
        line(this.position.x, this.position.y, (mouseX - width / 2.3), (mouseY - height / 2.3));
    };
}