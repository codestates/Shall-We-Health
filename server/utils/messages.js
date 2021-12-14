const moment = require("moment");

module.exports = {
  formatMessage: (authorId, nickname, content) => {
    const res = {
      authorId,
      nickname,
      content,
      datetime: moment().format("h:mm a"),
    };
    return res;
  },
};
