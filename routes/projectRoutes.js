const express = require("express");
const { createProject, addDataLayer, addAttribute } = require("../controllers/projectController");

const router = express.Router();

// Create a new project
router.post("/", createProject);

// Add a data layer to a project
router.post("/:projectId/layers", addDataLayer);

// Add an attribute to a data layer
router.post("/:projectId/layers/:layerId/attributes", addAttribute);

module.exports = router;
