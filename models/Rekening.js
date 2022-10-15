const mongoose = require("mongoose");

const rekeningSchema = new mongoose.Schema({
  namaBank: {
    type: String,
    required: true,
  },
  nomorRekening: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Rekening", rekeningSchema);
