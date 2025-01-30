const mongoose = require("mongoose");


const attributeSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  hintText: { type: String, required: true },
  fieldLayer: { type: String, enum: ["text", "video", "image"], required: true },
});


const dataLayerSchema = new mongoose.Schema({
  layerName: { type: String, required: true, trim: true },
  type: { type: String, enum: ["polygon", "line", "point"], required: true },
  layerCategory: { type: String, enum: ["dynamicLayer", "images"], required: true },
  streetSRD: { 
    type: String, 
    enum: ["drainage", "network", "electricity line", "railway line", "steam", "canal", "water network"], 
    required: true 
  },
  attributes: [attributeSchema],
});


const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    dataLayers: [dataLayerSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
