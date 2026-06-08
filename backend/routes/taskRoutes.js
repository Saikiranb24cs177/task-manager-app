const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Task Routes Working");
});

module.exports = router;