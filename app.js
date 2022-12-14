var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");


const userRouter = require("./routes/user");
const activityRouter = require("./routes/activity");
const healthRateRouter = require("./routes/healthRate");

var app = express();

const cors = require('cors');
app.disable('etag');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:3001'}));

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  })
  .then(() => {
    app.emit("app_started");
  })
  .catch((err) => {
    console.log("Cannot connect to db", err);
  });

mongoose.connection.on("connected", () => {
  console.log("Connect to db is successfully");
  app.emit("app_started");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/activity", activityRouter);
app.use("/healthRate", healthRateRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
