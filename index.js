// import necessary library
const express = require("express");
var cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const cors = require("cors");

// mongoose
const mongoose = require("mongoose");

// connect to mongoose
mongoose.connect("mongodb://localhost:27017/brifest", {
  useNewUrlParser: true,
});

// import router
const investorRouter = require("./api/investor");
const UMKMRouter = require("./api/umkm");
const userController = require("./api/user");

// initializing app
const app = express();

// user cors for API sharing
app.use(cors());

// use method override for using delete or update in POST
app.use(methodOverride("_method"));

// initialize session
app.use(
  session({
    secret: "brifest",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: Date.now() + 3600000,
      expires: Date.now() + 3600000,
    },
  })
);

// json parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use("/", userController);
app.use("/investor", investorRouter);
app.use("/umkm", UMKMRouter);

// run app
app.listen(5000, () => {
  console.log("listening on port 5000");
});
