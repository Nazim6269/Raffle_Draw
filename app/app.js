//external import
require("dotenv").config("../app/.env");
const express = require("express");
const app = express();
//internal import
const middlewareArray = require("./middleware");
const routes = require("./routes");
const { notFoundHandler, serverErrorHandler } = require("./error");

app.use(middlewareArray);
app.use(routes);
app.use(notFoundHandler);
app.use(serverErrorHandler);

module.exports = app;
