const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const userRoutes = require("./routes/user");
const stuffRoutes = require("./routes/stuff");
const resaRoutes = require("./routes/resa");
const messageRoutes = require("./routes/message");
const voitureRoutes = require("./routes/voiture");

const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);

const URI = process.env.MONGO_URI;
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée ! Car : " + err));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/resa", resaRoutes);
app.use("/api/mess", messageRoutes);
app.use("/api/voiture", voitureRoutes);

module.exports = app;
