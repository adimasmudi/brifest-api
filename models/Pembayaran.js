const mongoose = require("mongoose");

const pembayaranSchema = new mongoose.Schema({
  tanggal: {
    type: Date,
    required: true,
  },
  jumlahLembarSaham: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  buktiBayar: {
    type: String,
    required: true,
  },
  pendanaanId: {
    type: ObjectId,
    ref: "Pendanaan",
  },
});

module.exports = mongoose.model("Pembayaran", pembayaranSchema);
