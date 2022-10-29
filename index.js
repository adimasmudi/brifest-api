// import necessary library
const express = require("express");
var cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const cors = require("cors");
const path = require("path");

const bodyParser = require("body-parser");

// rerquire the dotenv
require("dotenv").config({ path: __dirname + "/.env" });

// mongoose
const mongoose = require("mongoose");

// connect to mongoose
mongoose.connect(
  "mongodb+srv://brifest:brifest@cluster0.hoyf0.mongodb.net/brifest?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

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
app.use(express.json({ limit: "100mb" }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ limit: "100mb", extended: false }));

app.use(cookieParser());
app.use("/public", express.static("public"));

// routes
app.use("/", userController);
app.use("/investor", investorRouter);
app.use("/umkm", UMKMRouter);

const port = process.env.PORT || 5000;
// run app
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
