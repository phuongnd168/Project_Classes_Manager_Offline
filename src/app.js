require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var expressLayouts = require("express-ejs-layouts");
var session = require("express-session");
var flash = require("connect-flash");
const passport = require("passport");
const model = require("./models/index");
const localPassport = require("./passport/localPassport");
const googlePassport = require("./passport/googlePassport");
const githubPassport = require("./passport/githubPassport");
const facebookPassport = require("./passport/facebookPassport");

const studentsRouter = require("./routes/students/index");
const teachersRouter = require("./routes/teacher/index");
const adminRouter = require("./routes/admin/index");
const authRouter = require("./routes/auth/index");
const roleMiddleware = require("./http/middlewares/role.middleware");
const authMiddleware = require("./http/middlewares/auth.middleware");
const loginTokenMiddleware = require("./http/middlewares/login.token.middleware");
const sendOtpMiddleware = require("./http/middlewares/send.otp.middleware");

var app = express();

app.use(
  session({
    secret: "Project-Classes-Manager",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(async function (user, done) {
  return done(null, user);
});

passport.deserializeUser(async function (user, done) {
  if (user?.userId) {
    const userDetail = await model.User.findByPk(user.userId);
    userDetail.userSocial = user;
    return done(null, userDetail);
  }
  return done(null, user);
});

passport.use("local", localPassport);
passport.use("google", googlePassport);
passport.use("github", githubPassport);
passport.use("facebook", facebookPassport);

// view engine setup
app.set("views", path.join(__dirname, "resources/views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/master.layout.ejs"); // set layout default
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

//Routes
app.use("/auth", authRouter);
app.use(authMiddleware);
app.use(sendOtpMiddleware);
app.use(loginTokenMiddleware);

app.use("/role", roleMiddleware);
app.use("/", studentsRouter);
app.use("/teacher", teachersRouter);
app.use("/admin", adminRouter);

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
