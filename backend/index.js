const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const router = require("./Routes/router");

// OPTIONS
app.set("port", 3001);
app.set("json spaces", 2);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// MIDDLEWARES
app.use(morgan("dev"));
app.use(express.urlencoded({ limit:'100mb', extended: false }));
app.use(express.json({limit:'100mb'}));
app.use(cors());

// ROUTES
app.use("/api", router);

// INITIALIZER
app.listen(app.get("port"), () => {
  console.log(`SERVIDOR EN PUERTO: ${app.get("port")}`);
});
