const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const core = require("../src/assistant-core");
const { connectDatabase } = require("./db");
const { seedProducts, getProducts, createOrder } = require("./store");

dotenv.config();

const app = express();
const sessions = new Map();
const port = Number(process.env.PORT || 8080);
let mongoEnabled = false;

app.use(cors());
app.use(express.json());

function getSession(sessionId) {
  const id = sessionId || "demo-session";
  if (!sessions.has(id)) sessions.set(id, core.createSession());
  return { id, state: sessions.get(id) };
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, database: mongoEnabled ? "mongodb" : "memory" });
});

app.get("/api/products", async (_req, res, next) => {
  try {
    res.json({ products: await getProducts(mongoEnabled) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/assistant", async (req, res, next) => {
  try {
    const command = String(req.body.command || "");
    const { id, state } = getSession(req.body.sessionId);
    const products = await getProducts(mongoEnabled);
    const result = core.respond(state, command, products);

    if (result.orderPlaced && result.cart.length) {
      const order = await createOrder(mongoEnabled, {
        sessionId: id,
        items: result.cart.map((item) => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total: result.total,
        language: result.nlu.language,
        finalCommand: command
      });
      state.cart = [];
      result.cart = [];
      result.total = 0;
      result.order = order;
    }

    res.json({ sessionId: id, ...result });
  } catch (error) {
    next(error);
  }
});

app.post("/api/session/reset", (req, res) => {
  const { id } = getSession(req.body.sessionId);
  sessions.set(id, core.createSession());
  res.json({ sessionId: id, message: "Session reset" });
});

const distPath = path.join(__dirname, "..", "client", "dist");
app.use(express.static(distPath));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(distPath, "index.html"), (error) => {
    if (error) res.status(404).send("Build the React client with npm run build, or run npm run dev for development.");
  });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: "Server error", detail: error.message });
});

async function start() {
  mongoEnabled = await connectDatabase();
  await seedProducts(mongoEnabled);
  app.listen(port, "127.0.0.1", () => {
    console.log(`MERN assistant API running at http://127.0.0.1:${port}`);
  });
}

start();
