const mongoose = require("mongoose");

const penerimaPerjanjianSchema = new mongoose.Schema({
  TTD: {
    type: String,
    required: true,
  },
  pengajuId: {
    type: ObjectId,
    ref: "PengajuanPerjanjian",
  },
  userId: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("PenerimaPerjanjian", penerimaPerjanjianSchema);
