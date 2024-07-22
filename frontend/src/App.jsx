import React, { useEffect, useReducer, useState } from "react";
import ItemForm from "./components/ItemsForm";
import ItemList from "./components/ItemsList";
import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";
import "./App.css";

const initialState = {
  items: [],
  categories: [],
  selectedItem: null,
  selectedCategory: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload };
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
      };
    case "SELECT_ITEM":
      return { ...state, selectedItem: action.payload };
    case "CLEAR_SELECTED_ITEM":
      return { ...state, selectedItem: null };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "ADD_CATEGORY":
      return { ...state, categories: [...state.categories, action.payload] };
    case "EDIT_CATEGORY":
      return {
        ...state,
        categories: state.categories.map(cat =>
          cat._id === action.payload._id ? action.payload : cat
        ),
      };
    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(cat => cat._id !== action.payload),
      };
    case "SELECT_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "CLEAR_SELECTED_CATEGORY":
      return { ...state, selectedCategory: null };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("http://localhost:5000/api/items");
      const data = await response.json();
      dispatch({ type: "SET_ITEMS", payload: data });
    };

    const fetchCategories = async () => {
      const response = await fetch("http://localhost:5000/api/categories");
      const data = await response.json();
      dispatch({ type: "SET_CATEGORIES", payload: data });
    };

    fetchItems();
    fetchCategories();
  }, []);

  const addItem = async (name, description, categoryId, tagIds) => {
    const newItem = { name, description, categoryId, tagIds };
    const response = await fetch("http://localhost:5000/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    const data = await response.json();
    dispatch({ type: "ADD_ITEM", payload: data });
  };

  const deleteItem = async id => {
    await fetch(`http://localhost:5000/api/items/${id}`, {
      method: "DELETE",
    });
    dispatch({ type: "DELETE_ITEM", payload: id });
  };

  const selectItem = async id => {
    const response = await fetch(`http://localhost:5000/api/items/${id}`);
    const data = await response.json();
    dispatch({ type: "SELECT_ITEM", payload: data });
  };

  const addCategory = async category => {
    const response = await fetch("http://localhost:5000/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    const savedCategory = await response.json();
    dispatch({ type: "ADD_CATEGORY", payload: savedCategory });
  };

  const editCategory = async (id, category) => {
    const response = await fetch(`http://localhost:5000/api/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    const updatedCategory = await response.json();
    dispatch({ type: "EDIT_CATEGORY", payload: updatedCategory });
  };

  const deleteCategory = async id => {
    await fetch(`http://localhost:5000/api/categories/${id}`, {
      method: "DELETE",
    });
    dispatch({ type: "DELETE_CATEGORY", payload: id });
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        justifyItems: "center",
      }}
    >
      <div>
        <h1>App de Gestión</h1>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <h2>Crear Item</h2>
              <ItemForm onAddItem={addItem} categories={state.categories} />
            </div>
            <div>
              <ItemList
                items={state.items}
                onDeleteItem={deleteItem}
                onSelectItem={selectItem}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            flex: 1,
            marginLeft: "20px",
            width: 800,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <div>
            <h2>Detalles del Item</h2>
            {state.selectedItem ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ flex: 1 }}>
                  <h3>nombre: {state.selectedItem.name}</h3>
                  <p>Descripcion: {state.selectedItem.description}</p>

                  <p>
                    <u style={{ fontStyle: "bold" }}>Categoría:</u>{" "}
                    {state.selectedItem.category
                      ? state.selectedItem.category.name
                      : "Sin Categoría"}
                  </p>
                </div>
                <div style={{ flex: 1, marginLeft: "20px" }}>
                  <h4>Detalles en JSON</h4>
                  <pre>{JSON.stringify(state.selectedItem, null, 2).replace("\"tags\": [],","")}</pre>
                </div>
              </div>
            ) : (
              <p>Selecciona un item para ver los detalles.</p>
            )}
          </div>
        </div>
        <div style={{ flex: 1, marginLeft: "20px" }}>
          <h2>Crear Categoría</h2>
          <CategoryForm
            onAddCategory={addCategory}
            onEditCategory={editCategory}
            selectedCategory={state.selectedCategory}
          />

          <CategoryList
            categories={state.categories}
            onEditCategory={category =>
              dispatch({ type: "SELECT_CATEGORY", payload: category })
            }
            onDeleteCategory={deleteCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
