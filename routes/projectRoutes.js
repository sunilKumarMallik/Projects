const express = require("express");
const { createProject, getProjects, getProjectById, updateProject, deleteProject } = require("../controllers/projectController");
const { authenticateUser, authorizeAdmin } = require("../middleware/auth");


const router = express.Router();

router.post("/",  authenticateUser, createProject);

router.get("/", authenticateUser,getProjects);

router.get("/:id",authenticateUser, getProjectById);

router.put("/:id", authenticateUser, updateProject);

router.delete("/:id", authenticateUser, authorizeAdmin, deleteProject);


module.exports = router;
