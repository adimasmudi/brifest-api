const router = require("express").Router();
const Usaha = require("../models/Usaha");
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
  } = req.body;

  await Usaha.create({
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
  })
    .then((usaha) => {
      return res.status(200).json(usaha);
    })
    .catch((error) => {
      return res.status(500).json({ message: "Internal Server Error" });
    });
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

module.exports = router;
