module.exports = {
  upload: async (req, res) => {
    try {
      res.end();
    } catch (err) {
      throw err;
    }
  },
  lists: async (req, res) => {
    try {
      res.end();
    } catch (err) {
      throw err;
    }
  },
  list: async (req, res) => {
    try {
      res.end();
    } catch (err) {
      throw err;
    }
  },
  content: require("./content"),
  match: require("./match"),
};
