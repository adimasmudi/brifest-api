const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

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
  pendanaanId: [
    {
      type: ObjectId,
      ref: "Pendanaan",
    },
  ],
});

module.exports = mongoose.model("Usaha", usahaSchema);
