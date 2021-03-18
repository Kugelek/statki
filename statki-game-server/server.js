const express = require("express");

class Server {
  constructor() {
    this.httpServer = express().listen(process.env.PORT || 3000, () => {
      console.log(
        "listening at http://" +
          this.httpServer.address().address +
          ":" +
          this.httpServer.address().port
      );
    });
  }
}
module.exports = {
  Server,
};
