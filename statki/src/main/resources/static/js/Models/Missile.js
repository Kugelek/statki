
class Missile {
    construcor(x, y, r, heartbeats){
        this.x = x;
        this.y = y;
        this.r = r;
        this.heartbeats = heartbeats;
        this.vel = createVector(0, 0);
    }

    // constrain() {
    //   missile.pos.x = constrain(missile.pos.x, -width / 4, width / 4);
    //   missile.pos.y = constrain(missile.pos.y, -height / 4, height / 4);
    // };

    show() {
        fill('rgba(100%,0%,100%,0.5)');
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    };

    update(){
        this.x += 3;
        this.y += 3;
        this.heartbeats -= 1;
    }
}
