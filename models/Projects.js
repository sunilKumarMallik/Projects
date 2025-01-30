const mongoose = require("mongoose");

// Attribute Schema
const attributeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Attribute name is required"],
    trim: true,
  },
  hintText: {
    type: String,
    required: [true, "Hint text is required"],
  },
  fieldLayer: {
    type: String,
    enum: ["text", "video", "image"],
    required: [true, "Field layer type is required"],
  },
});

// Data Layer Schema
const dataLayerSchema = new mongoose.Schema({
  layerName: {
    type: String,
    required: [true, "Layer name is required"],
    trim: true,
  },
  type: {
    type: String,
    enum: ["polygon", "line", "point"],
    required: [true, "Layer type is required"],
  },
  layerCategory: {
    type: String,
    enum: ["dynamicLayer", "images"],
    required: [true, "Layer category is required"],
  },
  streetSRD: {
    type: String,
    enum: [
      "drainage",
      "network",
      "electricity line",
      "railway line",
      "steam",
      "canal",
      "water network",
    ],
    required: [true, "Street SRD is required"],
  },
  attributes: [attributeSchema], // Multiple attributes inside a data layer
});

// Project Schema
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    dataLayers: [dataLayerSchema], // Array of layers inside project
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
