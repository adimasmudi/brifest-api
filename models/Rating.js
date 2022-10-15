const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  bintang: {
    type: Number,
    required: true,
  },
  komentar: {
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

module.exports = mongoose.model("Rating", ratingSchema);
