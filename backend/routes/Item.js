const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Item = require("../models/Item");
const Category = require("../models/Category");
const Tag = require("../models/Tag");

// Crear un nuevo item
router.post("/", async (req, res) => {
  const { name, description, categoryId, tagIds } = req.body;
  try {
    const newItem = new Item({
      name,
      description,
      category: categoryId,
      tags: tagIds,
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener todos los items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find()
      .populate("category", "name description") // Popula la categoría
      .populate("tags", "name"); // Popula los tags
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un item por ID
router.get("/:id", async (req, res) => {
  try {
    const itemId = new mongoose.Types.ObjectId(req.params.id); // Conversión explícita
    const item = await Item.findById(itemId)
      .populate("category", "name description") // Popula la categoría
      .populate("tags", "name"); // Popula los tags
    if (!item) return res.status(404).json({ message: "Item no encontrado" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un item
router.put("/:id", async (req, res) => {
  const { name, description, categoryId, tagIds } = req.body;
  try {
    const itemId = new mongoose.Types.ObjectId(req.params.id); // Conversión explícita
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item no encontrado" });

    item.name = name;
    item.description = description;
    item.category = categoryId;
    item.tags = tagIds;
    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un item
router.delete("/:id", async (req, res) => {
  try {
    const itemId = new mongoose.Types.ObjectId(req.params.id); // Conversión explícita
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item no encontrado" });

    await item.deleteOne();
    res.json({ message: "Item eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
