const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const dividenSchema = new mongoose.Schema({
  tanggal: {
    type: Date,
    required: true,
  },
  jumlahLembarSaham: {
    type: Number,
    required: true,
  },
  nominal: {
    type: Number,
    required: true,
  },
  buktiTransfer: {
    type: String,
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

module.exports = mongoose.model("Dividen", dividenSchema);
