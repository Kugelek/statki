
class Missile {
    constructor(x, y, r, ownerName, heartbeats){
        this.x = x;
        this.y = y;
        this.r = r;
        this.ownerName = ownerName;
        this.heartbeats = heartbeats;
      //  this.vel = createVector(mouseX - this.x, mouseY - this.y).normalize();
        this.vel = createVector(mouseX - width / 2, mouseY - height / 2);
        this.destinationVectorX = (this.vel.x);
        this.destinationVectorY = (this.vel.y);
        // console.log("CONSTRUCOR MISSILE");
        // console.log(this.destinationVectorX+ " vec  "+this.destinationVectorY);
        // console.log(this.mouseX+ " mouses  "+this.mouseY);
        // console.log(this.x+ " shipcoodrd  "+this.y);
        // this.destinationVectorX = (mouseX - this.x);
        // this.destinationVectorY = (mouseY - this.y);
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
