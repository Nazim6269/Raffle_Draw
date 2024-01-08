const router = require("express").Router();
//internal imports
const db = require("../db/db");

router
  .route("/t/:ticketId")
  .get((req, res) => {
    const ticketId = req.params.ticketId;
    const ticket = db.find(ticketId);
    res.status(200).json({ message: "Ticket find successfully" }, ticket);
  })
  .patch((req, res) => {
    {
      const ticketId = req.params.ticketId;
      const updateTicket = db.updateById(ticketId, req.body);
      res
        .status(200)
        .json({ message: "Ticket updated successfylly" }, updateTicket);
    }
  })
  .delete((req, res) => {
    const ticketId = req.params.ticketId;
    db.deleteById(ticketId);
    res.status(203).send();
  });

router
  .route("/u/:username")
  .get((req, res) => {
    const username = req.params.username;
    const user = db.findByUsername(username);
    res.status(201).json({ message: "User find successfully" }, user);
  })
  .patch((req, res) => {
    const username = req.params.username;
    const user = db.findByUsername(username);
    res.status(200).json({ message: "user updated successfully" }, user);
  })
  .delete((req, res) => {
    const username = req.params.username;
    db.deleteById(username);
    res.status(203).send();
  });

router.post("/sell", (req, res) => {
  const { username, price } = req.body;

  const ticket = db.create(username, price);
  res.status(201).json({ message: "Ticket created successfully", ticket });
});
router.post("/bulk", (req, res) => {
  const { username, price, quantity } = req.body;
  const tickets = db.bulkTicket(username, price, quantity);
  res
    .status(201)
    .json({ message: "Bulk tidkets created successfylly", tickets });
});
router.get("/draw", (req, res) => {
  const winnerCount = req.query.wc ?? 3;
  const winners = db.draw(winnerCount);

  res.status(200).json(winners);
});
router.get("/", (_req, res) => {
  const tickets = db.find();
  res.status(201).json(tickets);
});
module.exports = router;