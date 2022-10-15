const mongoose = require("mongoose");

const pesanSchema = new mongoose.Schema({
  tanggal: {
    type: Date,
    required: true,
  },
  isi: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Pesan", pesanSchema);
