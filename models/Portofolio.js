const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const portofolioSchema = new mongoose.Schema({
  totalPendanaan: {
    type: Number,
    required: true,
  },
  totalDividen: {
    type: Number,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Portofolio", portofolioSchema);
