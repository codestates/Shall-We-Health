const moment = require("moment");

module.exports = {
  formatMessage: (authorId, nickname, content) => {
    const res = {
      authorId,
      nickname,
      content,
      createdAt: moment().format("hh:mm a"),
    };
    return res;
  },
};
