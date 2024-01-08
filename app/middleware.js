const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const middlewareArray = [morgan("dev"), cors(), express.json()];

module.exports = middlewareArray;
