const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemsRouter = require("./routes/Item");
const categoriesRouter = require("./routes/Category");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose
  .connect("mongodb://localhost:27017/gestion", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch(err => {
    console.error("Error al conectar a MongoDB", err);
  });

// Rutas
app.use("/api/items", itemsRouter);
app.use("/api/categories", categoriesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
