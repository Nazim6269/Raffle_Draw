const router = require("express").Router();
//internal imports
const ticketRouter = require("../routes/ticket");

router.use("/api/v1/tickets", ticketRouter);

router.get("/health", (_req, res) => {
  res.json("hello");
});

module.exports = router;
