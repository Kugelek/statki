class Ship {
  constructor(id, x, y, r, hp, name, points) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
    this.hp = hp;
    this.name = name;
    this.points = points;
  }
}
module.exports = {
  Ship,
};
