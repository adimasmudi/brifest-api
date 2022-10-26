const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const riwayatSchema = new mongoose.Schema({
  jenis: {
    type: String,
    required: true,
  },
  judul: {
    type: String,
    required: true,
  },
  isi: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Riwayat", riwayatSchema);
