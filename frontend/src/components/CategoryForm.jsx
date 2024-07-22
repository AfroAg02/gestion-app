import React, { useState } from "react";

const CategoryForm = ({ onAddCategory, onEditCategory, selectedCategory }) => {
  const [name, setName] = useState(
    selectedCategory ? selectedCategory.name : ""
  );
  const [description, setDescription] = useState(
    selectedCategory ? selectedCategory.description : ""
  );

  const handleSubmit = async e => {
    e.preventDefault();
    const categoryData = { name, description };

    if (selectedCategory) {
      // Editar categoría existente
      await fetch(
        `http://localhost:5000/api/categories/${selectedCategory._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(categoryData),
        }
      );
      onEditCategory(selectedCategory._id, categoryData);
    } else {
      // Crear nueva categoría
      const response = await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });
      const savedCategory = await response.json();
      onAddCategory(savedCategory);
    }

    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nombre"
        required
      />
      <input
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Descripción"
      />
      <button type="submit">
        {selectedCategory ? "Actualizar" : "Agregar"} Categoría
      </button>
    </form>
  );
};

export default CategoryForm;
