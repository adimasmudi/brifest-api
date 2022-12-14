const router = require("express").Router();
const ObjectId = require("mongodb").ObjectID;

// import model
const Pendanaan = require("../models/Pendanaan");
const Usaha = require("../models/Usaha");
const User = require("../models/User");
const Pembayaran = require("../models/Pembayaran");
const PengajuanPerjanjian = require("../models/PengajuanPerjanjian");

// upload file middleware
// middlewares
const auth = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/multer");

// get dashboard data
router.get("/dashboard", auth, async (req, res) => {
  const pendanaan = await Pendanaan.find({ userId: req.user.userId });

  const allUsaha = await Usaha.find({})
    .populate("userId")
    .populate("pendanaanId");

  return res.status(200).json({
    user: req.user,
    dana: pendanaan,
    usaha: allUsaha,
  });
});

router.get("/listUsaha", auth, async (req, res) => {
  const pendanaan = await Pendanaan.find({ userId: req.user.userId })
    .populate("usahaId")
    .then(async (dana) => {
      return res.status(200).json({ pendanaan: dana });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Internal Server Error" });
    });
});

// get detail usaha
router.get("/detailUsaha/:id", auth, async (req, res) => {
  const usaha = await Usaha.findById(req.params.id)
    .populate("pendanaanId")
    .populate("userId")
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

// pemberian pendanaan
router.post("/addPendanaan", auth, uploadFile, async (req, res) => {
  const { jumlahLembarSaham, nominal, usahaId, images } = req.body;

  const pendanaan = await Pendanaan.create({
    tanggal: new Date(),
    jumlahLembarSaham,
    status: "proses",
    images: `images/${req.files.images[0].filename}`,
    nominal,
    userId: req.user.userId,
    usahaId,
  }).catch((error) => {
    return res.status(500).json(error);
  });

  const user = await User.findOne({ _id: req.user.userId });
  user.pendanaanId.push({ _id: pendanaan._id });
  await user.save();

  const usaha = await Usaha.findOne({ _id: usahaId });
  usaha.pendanaanId.push({ _id: pendanaan._id });
  await usaha.save();

  return;
});

// Penawaran awal : Perjanjian
router.get("/viewFormPerjanjian/:idUsaha", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).then((user) => {
    return user;
  });

  const usaha = await Usaha.findOne({ _id: req.params.idUsaha })
    .populate({
      path: "userId",
      select: "id namaUser email",
    })
    .then(async (usaha) => {
      const pendanaan = await Pendanaan.findOne({
        userId: user._id,
        usahaId: usaha._id,
      });

      return res.status(200).json({
        namaInvestor: user.namaUser,
        usaha: usaha,
        pendanaan: pendanaan,
      });
    });
});

router.post("/addPerjanjianInvestor", auth, uploadFile, async (req, res) => {
  const { usahaId, jumlahLembarSaham, kalimatPerjanjian, images } = req.body;

  await PengajuanPerjanjian.create({
    kalimatPerjanjian,
    jumlahLembarSaham,
    userId: req.user.userId,
    usahaId,
    images: `images/${req.files.images[0].filename}`,
  })
    .then((pengajuan) => {
      return res.status(200).json(pengajuan);
    })
    .catch((err) => {
      return res.status(500).json({ message: "Internal Server Error" });
    });
});

// view pembayaran
router.get("/viewFormBayar/:idUsaha", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).then((user) => {
    return user;
  });

  const usaha = Usaha.findOne({ _id: req.params.idUsaha })
    .populate({
      path: "userId",
      select: "id namaUser email",
    })
    .then(async (usaha) => {
      return res.status(200).json({
        namaInvestor: user.namaUser,
        usaha: usaha,
      });
    });
});

// pembayaran
// router.post("/bayar", auth, uploadFile, async (req, res) => {
//   const { jumlahLembarSaham, pendanaanId, images } = req.body;

//   const tanggal = new Date();

//   const status = "proses";

//   console.log(req.body);

//   // await Pembayaran.create({
//   //   jumlahLembarSaham,
//   //   status,
//   //   tanggal,
//   //   images: `images/${req.files.images[0].filename}`,
//   //   pendanaanId: ObjectId(pendanaanId),
//   // })
//   //   .then((pembayaran) => {
//   //     return res.status(200).json(pembayaran);
//   //   })
//   //   .catch((error) => {
//   //     return res.status(500).json({ message: error });
//   //   });
// });

module.exports = router;
