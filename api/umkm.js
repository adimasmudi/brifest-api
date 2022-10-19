const router = require("express").Router();

router.post("/addUsaha", (req, res) => {
  const {
    namaProduk,
    namaPerusahan,
    kategori,
    deskripsiUsaha,
    kebutuhanDana,
    minimalPembelian,
    persentaseSaham,
    prospektus,
    gambar,
    lokasi,
    mediaSosial,
  } = req.body;

  res
    .status(200)
    .json({
      namaProduk,
      namaPerusahan,
      kategori,
      deskripsiUsaha,
      kebutuhanDana,
      minimalPembelian,
      persentaseSaham,
      prospektus,
      gambar,
      lokasi,
      mediaSosial,
    });
});

module.exports = router;
