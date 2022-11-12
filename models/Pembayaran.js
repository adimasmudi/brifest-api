const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const pembayaranSchema = new mongoose.Schema({
  pendanaanId: {
    type: ObjectId,
    ref: "Pendanaan",
  },
});

module.exports = mongoose.model("Pembayaran", pembayaranSchema);
