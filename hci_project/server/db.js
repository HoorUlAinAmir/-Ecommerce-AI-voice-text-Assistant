const mongoose = require("mongoose");

async function connectDatabase() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bilingual_voice_commerce";
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 1500 });
    console.log("MongoDB connected");
    return true;
  } catch (error) {
    console.warn("MongoDB unavailable, using in-memory data store");
    return false;
  }
}

module.exports = { connectDatabase };
