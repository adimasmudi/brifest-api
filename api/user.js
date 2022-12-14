const router = require("express").Router();
const jwt = require("jsonwebtoken");

// middlewares
const auth = require("../middlewares/auth");

// import User model
const User = require("../models/User");

// bcrypt for password encryption
const bcrypt = require("bcrypt");

// get data user
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  await User.findOne({ _id: id })
    .then(async (user) => {
      return res.status(200).json(user);
    })
    .catch((error) => {
      return res.status(500).json({ message: "Internal Server Error" });
    });
});

// login
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email })
    .then(async (selectedUser) => {
      await bcrypt
        .compare(password, selectedUser.password)
        .then((truePassword) => {
          if (!truePassword)
            return res.status(500).json({ message: "Invalid Password" });
          // create a JWT Token
          const token = jwt.sign(
            {
              userId: selectedUser._id,
              userEmail: selectedUser.email,
              userRole: selectedUser.role,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          res.status(200).json({
            message: "Login successfull",
            userId: selectedUser._id,
            userEmail: selectedUser.email,
            userRole: selectedUser.role,
            token,
          });
        })
        .catch((error) => {
          return res.status(500).json({ message: "Invalid Password" });
        });
    })
    .catch((error) => {
      return res.json({
        message: `User with email ${email} doesn't exis `,
      });
    });
});

// register
router.post("/register", async (req, res) => {
  const {
    namaUser,
    NPWP,
    penghasilan,
    statusNikah,
    NIK,
    namaIbuKandung,
    alamat,
    noTelepon,
    email,
    password,
    role,
  } = req.body;

  const user = await User.findOne({ email: email });
  if (user) return res.json({ message: "email already exist" });

  bcrypt
    .hash(password, 10)
    .then(async (hashedPassword) => {
      await User.create(
        {
          gambar: "",
          namaUser,
          NPWP,
          penghasilan,
          statusNikah,
          NIK,
          namaIbuKandung,
          alamat,
          noTelepon,
          email,
          password: hashedPassword,
          role,
        },
        (err, data) => {
          if (err) return res.status(500).json({ error: err });

          res.status(200).json({ message: "success", data });
        }
      );
    })
    .catch((error) => {
      res.status(500).json({
        message: "Can't hash password",
        error,
      });
    });
});

module.exports = router;
