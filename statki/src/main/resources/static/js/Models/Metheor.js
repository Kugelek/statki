class Metheor {
    constructor(x, y, r, hp){
        this.x = x;
        this.y=y;
        this.r = r;
        this.hp = hp;
        this.pointsToGet = r*10;
    }

    show () {
        fill('rgba(61%,72%,73%,0.5)');
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    };


}
