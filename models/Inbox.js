const mongoose = require("mongoose");

const pesanSchema = new mongoose.Schema({
  tanggal: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "User",
  },
  pesanId: {
    type: ObjectId,
    ref: "Pesan",
  },
});

module.exports = mongoose.model("Pesan", pesanSchema);
