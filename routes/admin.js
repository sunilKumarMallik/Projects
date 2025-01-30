const express = require("express");
const { authenticateUser, authorizeAdmin } = require("../middleware/auth");
const router = express.Router();

// Protected Admin Route
router.get("/dashboard", authenticateUser, authorizeAdmin, (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard" });
});

module.exports = router;
