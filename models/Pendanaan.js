const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const pendanaanSchema = new mongoose.Schema({
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
