const router = require("express").Router();
const ObjectId = require("mongodb").ObjectID;

// import User model
const User = require("../models/User");
const Usaha = require("../models/Usaha");
const PenerimaPerjanjian = require("../models/PenerimaPerjanjian");
const Pendanaan = require("../models/Pendanaan");
const Dividen = require("../models/Dividen");
const RekapanUsaha = require("../models/RekapanUsaha");

// middlewares
const auth = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/multer");
const PengajuanPerjanjian = require("../models/PengajuanPerjanjian");

// UMKM dashboard
router.get("/dashboard", auth, async (req, res) => {
  try {
    const usaha = await Usaha.find({ userId: req.user.userId })
      .populate("userId")
      .populate("pendanaanId")
      .populate("rekapanId")
      .then(async (dataUsaha) => {
        return res.status(200).json({ usaha: dataUsaha, user: req.user });
      })
      .catch((err) => {
        return res.status(500).json({ message: err });
      });
  } catch (error) {
    console.log("err");
  }
});

// get all UMKM
router.get("/all", auth, async (req, res) => {
  await Usaha.find({})
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json({ message: "Internal Server Error" });
    });
});

// UMKM milik user tertentu
router.get("/usahaUser", auth, async (req, res) => {
  const idUser = req.user.userId;

  const usaha = await Usaha.find({ userId: idUser })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

// UMKM detail based on id
router.get("/usaha/:id", auth, async (req, res) => {
  await Usaha.findOne({ _id: req.params.id })
    .populate("pendanaanId")
    .populate("rekapanId")
    .then(async (data) => {
      return res.status(200).json({ usaha: data });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Internal Server Error" });
    });
});

// add Usaha
router.post("/addUsaha", auth, uploadFile, async (req, res) => {
  // console.log("body", req.body);
  const {
    namaProduk,
    namaPerusahaan,
    kategori,
    deskripsiUsaha,
    kebutuhanDana,
    minimalPembelian,
    persentaseSaham,
    lokasi,
    mediaSosial,
    images,
  } = req.body;

  // console.log(req.files);
  // console.log(req.user);

  const usaha = await Usaha.create({
    namaProduk,
    namaPerusahaan,
    kategori,
    deskripsiUsaha,
    kebutuhanDana,
    minimalPembelian,
    persentaseSaham,
    // prospektus: `prospektus/${req.files.prospektus[0].filename}`,
    images: `images/${req.files.images[0].filename}`,
    lokasi,
    mediaSosial,
    userId: req.user.userId,
  })
    .then((data) => {
      res.redirect("/umkm/dashboard");
    })
    .catch((error) => {
      return res.status(500).json({ message: error });
    });
});

//update UMKM
router.patch("/updateUsaha/:id", auth, async (req, res) => {
  await Usaha.findByIdAndUpdate(req.params.id, req.body, {
    returnOriginal: false,
  })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ message: "Internal Server Error" });
    });
});

// delete UMKM
router.delete("/deleteUsaha/:id", auth, async (req, res) => {
  await Usaha.findByIdAndDelete(req.params.id)
    .then((data) => {
      return res.status(200).json({ message: "delete successfull" });
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

// penerimaan UMKM

// for notification
router.get("/getPengajuanPerjanjian", auth, async (req, res) => {
  const usaha = await Usaha.find({ userId: req.user.userId }).then((usaha) => {
    usaha.map(async (us) => {
      const pengajuan = await PengajuanPerjanjian.find({
        usahaId: us._id,
      }).then((data) => {
        if (data !== []) return data;
      });
    });
  });
});

router.get("/viewPenerimaPerjanjian", auth, async (req, res) => {
  const pengajuanPerjanjian = await pengajuanPerjanjian.findOne({
    userId: req.user.userId,
  }); // belum boy
});

router.post("/addPenerimaPerjanjian", auth, uploadFile, async (req, res) => {
  const { status, pengajuId, userId } = req.body;

  await PenerimaPerjanjian.create({
    pengajuId,
    userId,
    status,
    TTD: `TTD/${req.files.TTD[0].filename}`,
  })
    .then((penerima) => {
      return res.status(200).json(penerima);
    })
    .catch((err) => {
      return res.status(500).json({ message: "Internal Server Error" });
    });
});

// portofolio usaha
router.get("/portofolioUsaha/:idUsaha", auth, async (req, res) => {
  const idUsaha = req.params.idUsaha;

  // belum
});

// //////////////////////// Rekapan Dana ////////////////////////
// add Rekapan dana
router.post("/addRekapanDana", auth, async (req, res) => {
  const { tanggal, judul, tipe, jumlah, catatan, usahaId } = req.body;

  const rekapan = await RekapanUsaha.create({
    tanggal, // sementara
    judul,
    tipe,
    jumlah,
    catatan,
    usahaId,
  }).catch((err) => {
    return res.status(500).json({ message: "Internal Server Error" });
  });

  const usaha = await Usaha.findOne({ _id: usahaId });
  usaha.rekapanId.push({ _id: rekapan._id });
  await usaha.save();
});

// get update form
router.get("/viewUpdateRekapanDana", auth, async (req, res) => {
  const rekapanId = "635a4186369c4bb4bf7b5433"; // sementara
  const rekapanLama = await RekapanUsaha.findById(rekapanId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json({ message: "Internal Server Error" });
    });
});

// update rekapan dana
router.patch("/updateRekapan", auth, async (req, res) => {
  const rekapanId = "635a4186369c4bb4bf7b5433"; // sementara
  await RekapanUsaha.findByIdAndUpdate(
    rekapanId,
    { ...req.body, tanggal: new Date() },
    {
      returnOriginal: false,
    }
  )
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ message: "Internal Server Error" });
    });
});

// deleteRekapan
router.delete("/deleteRekapan/:id", auth, async (req, res) => {
  const rekapanId = req.params.id; // sementara
  await RekapanUsaha.findByIdAndDelete(rekapanId)
    .then((_) => {
      return res.status(200).json({ message: "Delete data successfully" });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Internal Server Error" });
    });
});

// view list investor
router.get("/viewListInvestor/:idUsaha", auth, async (req, res) => {
  const idUsaha = req.params.idUsaha;

  const pendanaan = await Pendanaan.find({ usahaId: idUsaha })
    .populate("usahaId")
    .populate("userId")
    .then((data) => {
      res.status(200).json(data);
    });
});

// pemberian deviden
router.post("/transferDividen", auth, uploadFile, async (req, res) => {
  const { usahaId, userId, nominal, jumlahLembarSaham } = req.body;

  const tanggal = new Date();

  await Dividen.create({
    usahaId,
    userId,
    nominal,
    tanggal,
    jumlahLembarSaham,
    buktiTransfer: `buktiTransfer/${req.files.buktiTransfer[0].filename}`,
  })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json({ error: "Internal Server Error" });
    });
});

// view list transaksi
router.get("/allTransaksi", auth, async (req, res) => {
  const usaha = await Usaha.find({ userId: req.user.userId })
    .populate("pendanaanId")
    .populate("userId")
    .then((dataUsaha) => {
      // console.log(dataUsaha);
      return res.status(200).json({ dataUsaha: dataUsaha });
    })
    .catch((error) => {
      return res.status(500).json({ message: error });
    });
});

// get specific investor
router.get("/getInvestor/:id", auth, async (req, res) => {
  const pendanaan = await Pendanaan.findOne({ _id: req.params.id })
    .populate("userId")
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((error) => {
      return res.status(500).json({ message: error });
    });
});

module.exports = router;
