const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

// connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to db")
);

// import routes
const userRoutes = require("./routes");

// middlewares
app.use(express.json()); // for body parser

//cors
app.use(cors());


// route middlewares
app.use("/api", userRoutes);

app.listen(process.env.PORT, () => console.log("server is running port " + process.env.PORT));