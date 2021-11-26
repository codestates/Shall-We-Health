const { Sequelize } = require("sequelize");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./router/userRouter");
const postRouter = require("./router/postRouter");
const chatRouter = require("./router/chatRouter");
const adminRouter = require("./router/adminRouter");
const mypageRouter = require("./router/mypageRouter");

/*sequelize 설정*/
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: console.log,
    logging: (...msg) => console.log(msg),
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("successfully connected");
  } catch (error) {
    console.log("unalbe to connect to the database", error);
  }
};
testConnection();

/*서버 설정*/
const app = express();
app.use(cookieParser());
app.use(express.json({ strict: false }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  })
);

let server = app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is starting on ${process.env.PORT}`);
});
module.exports = server;

/*라우터 설정*/
app.use("/post", postRouter);
app.use("/mypage", mypageRouter);
app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/admin", adminRouter);
