import React, { useState } from "react";

const ItemForm = ({ onAddItem, categories }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tagIds, setTagIds] = useState([]); // Actualiza según los tags

  const handleSubmit = async e => {
    e.preventDefault();
    await onAddItem(name, description, categoryId, tagIds);
    setName("");
    setDescription("");
    setCategoryId("");
    setTagIds([]);
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
        required
      />
      <select
        value={categoryId}
        onChange={e => setCategoryId(e.target.value)}
        required
      >
        <option value="">Selecciona una categoría</option>
        {categories.map(category => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      {/* Aquí podrías añadir un componente para seleccionar tags */}
      <button type="submit">Agregar Item</button>
    </form>
  );
};

export default ItemForm;
