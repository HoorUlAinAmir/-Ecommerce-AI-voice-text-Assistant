const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: String,
    name: String,
    quantity: Number,
    price: Number
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    language: String,
    finalCommand: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
