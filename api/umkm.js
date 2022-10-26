const router = require("express").Router();
const Usaha = require("../models/Usaha");

// import User model
const User = require("../models/User");
const { uploadFile } = require("../middlewares/multer");

// get all UMKM
router.get("/all", async (req, res) => {
  await Usaha.find({})
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json({ message: "Internal Server Error" });
    });
});

// UMKM detail based on id
router.get("/usaha/:id", async (req, res) => {
  await Usaha.findOne({ _id: req.params.id })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json({ message: "Internal Server Error" });
    });
});

// add Usaha
router.post("/addUsaha", uploadFile, async (req, res) => {
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
    userId,
  } = req.body;

  const usaha = await Usaha.create({
    namaProduk,
    namaPerusahaan,
    kategori,
    deskripsiUsaha,
    kebutuhanDana,
    minimalPembelian,
    persentaseSaham,
    prospektus: `prospektus/${req.files.prospektus[0].filename}`,
    gambar: `gambar/${req.files.gambar[0].filename}`,
    lokasi,
    mediaSosial,
    userId,
  }).catch((error) => {
    return res.status(500).json({ message: "Internal Server Error" });
  });

  const user = await User.findOne({ _id: userId });
  user.usahaId.push({ _id: usaha._id });
  await user.save();
});

//update UMKM
router.patch("/updateUsaha/:id", async (req, res) => {
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
router.delete("/deleteUsaha/:id", async (req, res) => {
  await Usaha.findByIdAndDelete(req.params.id)
    .then((data) => {
      return res.status(200).json({ message: "delete successfull" });
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

// penerimaan UMKM
router.post("/addPenerimaPerjanjian", async (req, res) => {
  return;
});

// Rekapan dana

// pemberian deviden

module.exports = router;
