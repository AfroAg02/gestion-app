import React from "react";

const CategoryList = ({ categories, onEditCategory, onDeleteCategory }) => {
  return (
    <div>
      <h2>Lista de Categorías</h2>
      <ul>
        {categories.map(category => (
          <li key={category._id}>
            {category.name}: {category.description}
            <button onClick={() => onEditCategory(category)}>Editar</button>
            <button onClick={() => onDeleteCategory(category._id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
