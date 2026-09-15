const express = require("express");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/connectDb");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const app = express();
const cors = require("cors");
const connectCloudinary = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dns = require("dns");

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "https://blog-app-flax-nine-23.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dns.setDefaultResultOrder("ipv4first");

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

require("dotenv").config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("server is running in port number : ", PORT);
});

connectDb();
connectCloudinary();
