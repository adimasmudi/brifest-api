const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const notifikasiSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: true,
  },
  isi: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Notifikasi", notifikasiSchema);
