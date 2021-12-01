const io = require("../../index.js");

module.exports = {
  create: async (req, res) => {
    io.on("connection", (socket) => {
      console.log("a user connected");

      socket.on("message", (message) => {
        console.log(message);
      });
    });
    try {
      res.end();
    } catch (err) {
      throw err;
    }
  },
  message: require("./message"),
  lists: async (req, res) => {
    try {
      res.end();
    } catch (err) {
      throw err;
    }
  },
};
