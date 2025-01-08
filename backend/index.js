const express = require("express");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const mainRouter = require("./routes/index");

const app = exprss();

app.use("/api/v1", mainRouter);
app.listen(3000);
