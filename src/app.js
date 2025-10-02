const express = require("express");
const bodyParser = require("body-parser");
const { Database } = require("./db/database");
const dotenv = require("dotenv");
const studentRoutes = require("./routes/routes");
const app = express();

dotenv.config();

app.use(bodyParser.json({ type: "application/*+json" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.use("/api", studentRoutes);

module.exports = app;
