const express = require("express");
const Supplier = require("../models/SupplierModel");

const router = express.Router();

//  Get all suppliers
router.get("/", async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single supplier
router.get("/:id", getSupplier, (req, res) => {
  res.json(res.supplier);
});

// Creating a new supplier
router.post("/", async (req, res) => {
  const supplier = new Supplier({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
  });

  try {
    const newSupplier = await supplier.save();
    res.status(201).json(newSupplier);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// DELETE a new supplier
router.delete("/:id", getSupplier, async (req, res) => {
  try {
    await res.supplier.remove();
    res.json({ message: "Deleted supplier" });
  } catch (err) {
    res.status(500).json({ mssg: err.message });
  }
});

// UPDATE a new supplier
router.patch("/:id", getSupplier, async (req, res) => {
  if (req.body.name != null) {
    res.supplier.name = req.body.name;
  }
  if (req.body.email != null) {
    res.supplier.email = req.body.email;
  }
  if (req.body.phoneNumber != null) {
    res.supplier.phoneNumber = req.body.phoneNumber;
  }
  if (req.body.password != null) {
    res.supplier.password = req.body.password;
  }

  try {
    const updatedSupplier = await res.supplier.save();
    res.json(updatedSupplier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware function for gettig supplier by ID
async function getSupplier(req, res, next) {
  let supplier;
  try {
    supplier = await Supplier.findById(req.params.id);
    if (supplier == null) {
      return res.status(404).json({ mssg: "Cant find supplier" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.supplier = supplier;
  next();
}

module.exports = router;
