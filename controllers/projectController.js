const Project = require("../models/Project");

// @desc    Create new project
// @route   POST /api/projects
// @access  Admin only
const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const project = new Project({ name, description, dataLayers: [] });
    await project.save();

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Add a new data layer to a project
// @route   POST /api/projects/:projectId/layers
// @access  Admin only
const addDataLayer = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { layerName, type, layerCategory, streetSRD } = req.body;

    if (!layerName || !type || !layerCategory || !streetSRD) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const newLayer = { layerName, type, layerCategory, streetSRD, attributes: [] };
    project.dataLayers.push(newLayer);
    await project.save();

    res.status(201).json({ message: "Layer added successfully", project });
  } catch (error) {
    console.error("Error adding layer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Add an attribute to a data layer
// @route   POST /api/projects/:projectId/layers/:layerId/attributes
// @access  Admin only
const addAttribute = async (req, res) => {
  try {
    const { projectId, layerId } = req.params;
    const { firstName, hintText, fieldLayer } = req.body;

    if (!firstName || !hintText || !fieldLayer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const layer = project.dataLayers.id(layerId);
    if (!layer) {
      return res.status(404).json({ message: "Layer not found" });
    }

    const newAttribute = { firstName, hintText, fieldLayer };
    layer.attributes.push(newAttribute);
    await project.save();

    res.status(201).json({ message: "Attribute added successfully", project });
  } catch (error) {
    console.error("Error adding attribute:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createProject, addDataLayer, addAttribute };
