class MetheorRefiller {
  constructor() {}

  refillBoard(metheors) {
    const refillAmount = 20 - metheors.length;
    for (var i = 0; i < refillAmount; i++) {
      let randomRadius = Math.random() * 10 + 10;

      metheors.push({
        // x: Math.random() * gameSettings.width/4,
        // y: Math.random() * gameSettings.height/4,
        x: Math.random() * 500 - 300,
        y: Math.random() * 300 - 200,
        r: randomRadius,
        hp: 100,
        pointsToGet: randomRadius * 10,
      });
    }
  }
}
module.exports = {
  MetheorRefiller,
};
