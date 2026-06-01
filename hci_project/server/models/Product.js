const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    urdu: { type: String, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
