const mongoose = require("mongoose");

const pengajuanPerjanjianSchema = new mongoose.Schema({
  TTD: {
    type: String,
    required: true,
  },
  kalimatPerjanjian: {
    type: String,
    required: true,
  },
  jumlahLembarSaham: {
    type: Number,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model(
  "PengajuanPerjanjian",
  pengajuanPerjanjianSchema
);
