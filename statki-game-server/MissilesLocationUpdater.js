class MissilesLocationUpdater {
  constructor() {
    //tba global speed
  }

  async updateMissiles(missiles) {
    if (!missiles.length) return;
    missiles = missiles.filter((el) => el.heartbeats > 0);
    missiles.forEach((missile, ind) => {
      missile.x += missile.destinationVectorX / 100;
      missile.y += missile.destinationVectorY / 100;
      missile.heartbeats -= 0.3;
    });
  }
}

module.exports = {
  MissilesLocationUpdater,
};
