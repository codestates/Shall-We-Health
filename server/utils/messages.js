module.exports = {
  formatMessage: (authorId, content, time) => {
    const res = {
      authorId,
      content,
      time,
    };
    console.log(res);
    return res;
  },
};
