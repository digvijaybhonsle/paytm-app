const express = require("express");

const mainRouter = require("./routes/index");

const app = exprss();

app.use("/api/v1", mainRouter);
