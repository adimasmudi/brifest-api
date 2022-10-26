const router = require("express").Router();

// import model
const Pendanaan = require("../models/Pendanaan");
const Usaha = require("../models/Usaha");
const User = require("../models/User");
const Pembayaran = require("../models/Pembayaran");

// upload file middleware
const { uploadFile } = require("../middlewares/multer");

// get dashboard data
router.get("/dashboard", async (req, res) => {
  return;
});

// pemberian pendanaan
router.post("/addPendanaan", async (req, res) => {
  const { nominal, userId, usahaId } = req.body;

  const pendanaan = await Pendanaan.create({
    nominal,
    userId,
    usahaId,
  }).catch((error) => {
    return res.status(500).json(error);
  });

  const user = await User.findOne({ _id: userId });
  user.pendanaanId.push({ _id: pendanaan._id });
  await user.save();

  const usaha = await Usaha.findOne({ _id: usahaId });
  usaha.pendanaanId.push({ _id: pendanaan._id });
  await usaha.save();
});

// view pembayaran
router.get("/viewFormBayar/:idUsaha", async (req, res) => {
  const user = await User.findOne({ email: "adi@gmail.com" }).then((user) => {
    return user;
  });

  const usaha = Usaha.findOne({ _id: req.params.idUsaha })
    .populate({
      path: "userId",
      select: "id namaUser email",
    })
    .then((usaha) => {
      const pendanaan = Pendanaan.findOne({
        userId: user._id,
        usahaId: usaha._id,
      });
      return res.status(200).json({
        namaInvestor: user.namaUser,
        usaha: usaha,
        nominal: pendanaan.nominal,
      });
    });
});

// pembayaran
router.post("/bayar", uploadFile, async (req, res) => {
  const { jumlahLembarSaham, pendanaanId } = req.body;

  const tanggal = new Date();

  const status = "proses";

  await Pembayaran.create({
    jumlahLembarSaham,
    status,
    tanggal,
    buktiBayar: `buktiBayar/${req.files.buktiBayar[0].filename}`,
    pendanaanId: pendanaanId,
  })
    .then((pembayaran) => {
      return res.status(200).json(pembayaran);
    })
    .catch((error) => {
      return res.status(500).json({ message: "Internal Server Error" });
    });
});

module.exports = router;
