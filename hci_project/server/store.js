const crypto = require("crypto");
const core = require("../src/assistant-core");
const Product = require("./models/Product");
const Order = require("./models/Order");

const memory = {
  products: core.catalog.map((product) => ({ ...product })),
  orders: []
};

async function seedProducts(useMongo) {
  if (!useMongo) return memory.products;
  await Promise.all(
    core.catalog.map((product) =>
      Product.updateOne({ id: product.id }, { $set: product }, { upsert: true })
    )
  );
  return Product.find().sort({ category: 1, price: 1 }).lean();
}

async function getProducts(useMongo) {
  if (!useMongo) return memory.products;
  return Product.find().sort({ category: 1, price: 1 }).lean();
}

async function createOrder(useMongo, payload) {
  const order = {
    orderId: crypto.randomUUID(),
    ...payload,
    createdAt: new Date().toISOString()
  };
  if (!useMongo) {
    memory.orders.push(order);
    return order;
  }
  const saved = await Order.create(payload);
  return saved.toObject();
}

module.exports = { seedProducts, getProducts, createOrder };
