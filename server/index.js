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
require("socket.io");
const { Server } = require("socket.io");
const { formatMessage } = require("./utils/messages");

/*sequelize 설정*/
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    logging: console.log,
    logging: (...msg) => console.log(msg),
    // dialectOptions: {
    //   ssl: "Amazon RDS",
    // },
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
const corsOptions = {
  origin: [
    "https://shallwehealth.com",
    "https://www.shallwehealth.com",
    "http://localhost:3000",
    "http://localhost:3001",
  ],
  credentials: true,
};

app.use(cookieParser());
app.use(express.json({ strict: false }));
app.use(
  cors({
    ...corsOptions,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  })
);

const http = require("http").createServer(app);
const io = new Server(http, {
  cors: {
    ...corsOptions,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User conneced: ${socket.id}`);
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with Id: ${socket.id} joined room: ${data}`);
  });
  socket.on("send_message", (data) => {
    const messageData = formatMessage(
      data.authorId,
      data.content,
      data.createdAt
    );
    console.log(messageData);
    socket.to(data.room).emit("receive_message", messageData);
  });
  socket.on("disconnect", () => {
    console.log("User Disconnected, socket.id");
  });
});

let server = http.listen(process.env.PORT, () => {
  console.log(`🚀 Server is starting on ${process.env.PORT}`);
});
module.exports = server;

/*라우터 설정*/
app.use("/post", postRouter);
app.use("/mypage", mypageRouter);
app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/admin", adminRouter);
