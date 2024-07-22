import React from "react";

const ItemList = ({ items, onDeleteItem, onSelectItem }) => {
  return (
    <div>
      <h2>Lista de Items</h2>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name}: {item.description}
            <button onClick={() => onDeleteItem(item._id)}>Eliminar</button>
            <button onClick={() => onSelectItem(item._id)}>Ver Detalles</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
