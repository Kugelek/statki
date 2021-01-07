class Mine {
    constructor(x, y, r){
        this.x = x;
        this.y=y;
        this.r = r;
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
    }

    show () {
        fill('rgba(61%,72%,73%,0.5)');
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    };


}
