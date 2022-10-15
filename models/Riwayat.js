const mongoose = require("mongoose");

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
