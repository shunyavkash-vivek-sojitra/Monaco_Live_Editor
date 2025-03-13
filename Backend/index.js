require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");
const routes = require("./routes/indexRoute");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://shunyavkash-vivek-sojitra.github.io/Monaco_Live_Editor/",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Connect to Database
connectDB();

// Routes
app.use("/api", routes);

// Start Server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
