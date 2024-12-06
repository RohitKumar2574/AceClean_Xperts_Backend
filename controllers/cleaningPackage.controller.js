const Package = require("../models/CleaningPackage");

const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    console.error("Error fetching packages:", err);
    res.status(500).json({ error: "Error fetching packages" });
  }
};

const getAllPackageByType = async (req, res) => {
  try {
    const { type } = req.query;
    let packages;
    if(type){
      packages = await Package.find({ type });
    }else{
      packages = await Package.find();
    }

    res.json(packages);
  } catch (err) {
    console.error("Error fetching packages:", err);
    res.status(500).json({ error: "Error fetching packages" });
  }
};

const createPackage = async (req, res) => {
  const { name, price, description, type } = req.body;
  try {
    const newPackage = new Package({ name, price, description, type });
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (err) {
    console.error("Error creating package:", err);
    res.status(500).json({ error: "Error creating package" });
  }
};

const updatePackage = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, type } = req.body;
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      { name, price, description, type },
      { new: true }
    );
    if (!updatedPackage)
      return res.status(404).json({ error: "Package not found" });
    res.json(updatedPackage);
  } catch (err) {
    console.error("Error updating package:", err);
    res.status(500).json({ error: "Error updating package" });
  }
};

const deletePackage = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPackage = await Package.findByIdAndDelete(id);
    if (!deletedPackage)
      return res.status(404).json({ error: "Package not found" });
    res.json({ message: `Package with ID ${id} deleted` });
  } catch (err) {
    console.error("Error deleting package:", err);
    res.status(500).json({ error: "Error deleting package" });
  }
};

module.exports = {
  getAllPackages,
  getAllPackageByType,
  createPackage,
  updatePackage,
  deletePackage,
};
