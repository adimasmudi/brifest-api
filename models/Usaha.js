const mongoose = require("mongoose");

const usahaSchema = new mongoose.Schema({
  namaProduk: {
    type: String,
    required: true,
  },
  namaPerusahaan: {
    type: String,
    required: true,
  },
  kategori: {
    type: String,
    required: true,
  },
  deskripsiUsaha: {
    type: String,
    required: true,
  },
  kebutuhanDana: {
    type: String,
    required: true,
  },
  danaDidapat: {
    type: String,
    required: true,
  },
  minimalPembelian: {
    type: String,
    required: true,
  },
  persentaseSaham: {
    type: String,
    required: true,
  },
  prospektus: {
    type: String,
    required: true,
  },
  gambar: {
    type: String,
    required: true,
  },
  lokasi: {
    type: String,
    required: true,
  },
  lokasi: {
    type: [String],
    required: true,
  },
  mediaSosial: {
    type: [String],
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "User",
  },
  ratingId: {
    type: ObjectId,
    ref: "Rating",
  },
});

module.exports = mongoose.model("Usaha", usahaSchema);
