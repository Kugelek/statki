class Ship {
  constructor(x, y, r, hp, name, points) {
    this.position = createVector(x, y);
    this.r = r;
    this.velocity = createVector(0, 0);
    this.hp = hp;
    this.name = name;
    this.points = points;
  }

  update() {
    let updatedVelocity = createVector(mouseX - width / 2, mouseY - height / 2);
    updatedVelocity.div(50);
    updatedVelocity.limit(3);
    this.velocity.lerp(updatedVelocity, 0.2);
    this.position.add(this.velocity);
  }

  didCollideWith(type, hitObject) {
    let distance;
    if (type === "mine")
      distance = p5.Vector.dist(this.position, hitObject.position);
    if (type === "missile")
      distance = p5.Vector.dist(
        this.position,
        createVector(hitObject.x, hitObject.y)
      );

    return distance < 2 * hitObject.r;
  }

  constrain() {
    ship.position.x = constrain(ship.position.x, -width / 4, width / 4);
    ship.position.y = constrain(ship.position.y, -height / 4, height / 4);
  }

  drawNickname() {
    fill(255);
    textAlign(CENTER);
    textSize(4);
    text(this.name, this.position.x, this.position.y + 1.5 * this.r);
  }

  drawShipWithSkin() {
    fill(255);
    ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
  }

  drawCurrentScore() {
    fill(250, 215, 28);
    textAlign(CENTER);
    textSize(4);
    text(
      "Score: " + Math.floor(this.points),
      this.position.x - 100,
      this.position.y + 45
    );
  }
  drawHpBar() {
    rect(this.position.x - 20, this.position.y - 30, 40, 3, 5, 5, 5, 5);
    fill(0, 100, 100);
    rect(
      this.position.x - 20,
      this.position.y - 30,
      this.hp / 2.5,
      3,
      5,
      5,
      5,
      5
    );
  }

  show() {
    this.drawShipWithSkin();
    this.drawHpBar();
    this.drawNickname();
    this.drawCurrentScore();
    stroke(133, 133, 133);
    const vec = createVector(mouseX - width / 2, mouseY - height / 2);
    // line(this.position.x, this.position.y, (mouseX - width / 2.3), (mouseY - height / 2.3));
  }
}
