require("express-async-errors");
const express = require("express");
const app = express();

app.use(
	express.urlencoded({
		extended: true,
		limit: "150mb",
	}),
);
app.use(express.json({ limit: "150mb" }));

module.exports = app;
