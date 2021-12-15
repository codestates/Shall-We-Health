module.exports = async (req, res) => {
  try {
    res.clearCookie("accessToken", { path: "/" });
    res.status(205).end();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
