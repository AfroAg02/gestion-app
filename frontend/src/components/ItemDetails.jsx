import React from "react";

const ItemDetails = ({ item }) => {
  if (!item) return <p>Selecciona un item para ver los detalles</p>;

  return (
    <div>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <h4>Categoría:</h4>
      {item.category ? (
        <div>
          <p>{item.category.name}</p>
          <p>{item.category.description}</p>
        </div>
      ) : (
        <p>No tiene categoría</p>
      )}
      <h4>Tags:</h4>
      {item.tags.length > 0 ? (
        <ul>
          {item.tags.map(tag => (
            <li key={tag._id}>{tag.name}</li>
          ))}
        </ul>
      ) : (
        <p>No tiene tags</p>
      )}
    </div>
  );
};

export default ItemDetails;
