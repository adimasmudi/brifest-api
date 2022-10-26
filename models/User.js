const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
  gambar: {
    type: String,
  },
  namaUser: {
    type: String,
    required: true,
  },
  NPWP: {
    type: String,
  },
  penghasilan: {
    type: Number,
    required: true,
  },
  statusNikah: {
    type: String,
    required: true,
  },
  NIK: {
    type: String,
    required: true,
  },
  namaIbuKandung: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  noTelepon: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  rekeningId: {
    type: ObjectId,
    ref: "Rekening",
  },
  usahaId: [
    {
      type: ObjectId,
      ref: "Usaha",
    },
  ],
  pendanaanId: [
    {
      type: ObjectId,
      ref: "Pendanaan",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
