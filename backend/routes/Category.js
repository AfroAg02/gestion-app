const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const { default: mongoose } = require("mongoose");

// Crear una nueva categoría
router.post("/", async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCategory = new Category({ name, description });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
      res.status(400).json({ message: err.message });
      console.log(err.message);
  }
});

// Obtener todas las categorías
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
});

// Obtener una categoría por ID
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(new mongoose.Types.ObjectId(req.params.id));
    if (!category)
      return res.status(404).json({ message: "Categoría no encontrada" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
});

// Actualizar una categoría
router.put("/:id", async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = await Category.findById(new mongoose.Types.ObjectId(req.params.id));
    if (!category)
      return res.status(404).json({ message: "Categoría no encontrada" });

    category.name = name;
    category.description = description;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log(err.message);
  }
});

// Eliminar una categoría
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findById(new mongoose.Types.ObjectId(req.params.id));
    if (!category)
      return res.status(404).json({ message: "Categoría no encontrada" });

    await category.deleteOne();
    res.json({ message: "Categoría eliminada" });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
});

module.exports = router;
