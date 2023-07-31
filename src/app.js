import express from "express";
import ProductManager from "./src/ProductManager";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const manager = new ProductManager("./src/products.json");

// Middleware para limitar la cantidad de productos a mostrar
const limitProducts = async (req, res, next) => {
  const { limit } = req.query;
  if (limit) {
    const products = await manager.getProducts();
    const limited = products.slice(0, limit);
    req.products = limited;
  } else {
    req.products = await manager.getProducts();
  }
  next();
};

// Ruta para obtener todos los productos con posible limitación
app.get("/products", limitProducts, (req, res) => {
  res.status(200).json(req.products);
});

// Ruta para obtener un producto por su ID
app.get("/products/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const product = await manager.getProductsById(id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
