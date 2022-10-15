const mongoose = require("mongoose");

const perjanjianSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "User",
  },
  perjanjianId: {
    type: ObjectId,
    ref: "PenerimaPerjanjian",
  },
});

module.exports = mongoose.model("Perjanjian", perjanjianSchema);
