const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const pendanaanSchema = new mongoose.Schema({
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
  images: {
    type: String,
  },
  nominal: {
    type: Number,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "User",
  },
  usahaId: {
    type: ObjectId,
    ref: "Usaha",
  },
});

module.exports = mongoose.model("Pendanaan", pendanaanSchema);
