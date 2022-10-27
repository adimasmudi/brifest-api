const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const rekapanUsahaSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: true,
  },
  catatan: {
    type: String,
    required: true,
  },
  tanggal: {
    type: Date,
    required: true,
  },
  tipe: {
    type: String,
    required: true,
  },
  jumlah: {
    type: Number,
    required: true,
  },
  usahaId: {
    type: ObjectId,
    ref: "Usaha",
  },
});

module.exports = mongoose.model("RekapanUsaha", rekapanUsahaSchema);
