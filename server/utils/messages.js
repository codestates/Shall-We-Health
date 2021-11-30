const moment = require("moment");

module.exports = {
  formatMessage: (nickname, content) => {
    const res = {
      nickname,
      content,
      datetime: moment().format("h:mm a"),
    };
    return res;
  },
};
