const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const penerimaPerjanjianSchema = new mongoose.Schema({
  TTD: {
    type: String,
    required: true,
  },
  status: {
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
