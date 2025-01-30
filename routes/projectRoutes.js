const express = require("express");
const { createProject, getProjects, getProjectById, updateProject, deleteProject } = require("../controllers/projectController");
const { protect, isAdmin } = require("../middleware/auth");

const router = express.Router();

// Create a new project (User/Admin)
router.post("/", protect, createProject);

// Get all projects (Public)
router.get("/", getProjects);

// Get a project by ID (Public)
router.get("/:id", getProjectById);

// Update a project (Only the creator or Admin)
router.put("/:id", protect, updateProject);

// Delete a project (Only the creator or Admin)
router.delete("/:id", protect, deleteProject);

module.exports = router;
