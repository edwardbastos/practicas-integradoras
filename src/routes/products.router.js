// Importando la clase Router del módulo 'express'
import { Router } from "express";

// Importando la clase ProductManager desde un módulo personalizado
import ProductManager from "../manager/ProductsManager.js";

// Importando la variable '__dirname' desde un módulo personalizado
import { __dirname } from "../utils.js";

// Creando una nueva instancia de la clase ProductManager con la ruta al archivo JSON de productos
const manager = new ProductManager(__dirname + "/files/products.json");

// Creando una nueva instancia de la clase Router
const router = Router();

// Definiendo una ruta para manejar las solicitudes GET a la raíz ("/")
router.get("/", async (req, res) => {
  // Extrayendo el parámetro de consulta 'limit' de la solicitud
  const { limit } = req.query;

  // Obteniendo la lista de productos desde el ProductManager
  const products = await manager.getProducts();

  // Comprobando si se proporcionó un parámetro 'limit'
  if (limit) {
    // Recortando el array de productos para limitar la cantidad de productos devueltos
    const limitedProducts = products.slice(0, limit);

    // Enviando una respuesta JSON con los productos limitados
    res.status(200).json(limitedProducts);
  } else if (!limit) {
    // Enviando una respuesta JSON con todos los productos si no se proporciona 'limit'
    res.status(200).json(products);
  } else {
    // Enviando una respuesta de error si se proporcionó un valor de 'limit' inválido
    res.status(400).json({ message: "Error al obtener los productos" });
  }
});

// Definiendo una ruta para manejar las solicitudes GET con un parámetro de ID de producto
router.get("/:pid", async (req, res) => {
  // Analizando el parámetro 'pid' como un número entero
  const id = parseInt(req.params.pid);

  // Obteniendo un producto por su ID desde el ProductManager
  const product = await manager.getProductsById(id);

  // Comprobando si se encontró o no el producto
  if (product === "Not Found") {
    // Enviando una respuesta de error si no se encontró el producto
    res.status(400).json({ message: "Producto no encontrado" });
  } else if (product) {
    // Enviando una respuesta JSON con el producto encontrado
    res.status(200).json(product);
  } else {
    // Enviando una respuesta de error si ocurrió un error inesperado
    res.status(400).json({ message: "Producto no encontrado" });
  }
});

// Definiendo una ruta para manejar las solicitudes POST y crear un nuevo producto
router.post("/", async (req, res) => {
  try {
    // Agregando un nuevo producto utilizando el ProductManager
    const product = await manager.addProduct(req.body);

    // Manejando diferentes casos basados en el resultado de agregar el producto
    if (product === "The insert code already exists") {
      res.status(400).json({ message: "Error al crear el producto", product });
    } else if (product === "Complete all fields") {
      res.status(400).json({ message: "Error al crear el producto", product });
    } else {
      res.status(201).json({ message: "Producto creado", product });
    }
  } catch (error) {
    // Enviando una respuesta de error si ocurrió una excepción durante la creación del producto
    throw new Error("Error al crear el producto", error);
  }
});

// Definiendo una ruta para manejar las solicitudes PUT y actualizar un producto por ID
router.put("/:pid", async (req, res) => {
  // Analizando el parámetro 'pid' como un número entero
  const id = parseInt(req.params.pid);

  // Actualizando un producto utilizando el ProductManager
  const product = await manager.updateProduct(id, req.body);

  // Comprobando si el producto se actualizó correctamente
  if (product) {
    // Enviando una respuesta JSON indicando una actualización exitosa
    res.status(200).json({ message: "Producto actualizado", product });
  } else {
    // Enviando una respuesta de error si la actualización no fue exitosa
    res.status(400).json({ message: "Error al actualizar el producto" });
  }
});

// Definiendo una ruta para manejar las solicitudes DELETE y eliminar un producto por ID
router.delete("/:pid", async (req, res) => {
  // Analizando el parámetro 'pid' como un número entero
  const id = parseInt(req.params.pid);

  // Eliminando un producto utilizando el ProductManager
  const product = await manager.deleteProduct(id);

  // Manejando diferentes casos basados en el resultado de eliminar el producto
  if (product === `Can't find product with id : ${id}`) {
    res.status(400).json({ message: "Error al eliminar el producto", product });
  } else if (product) {
    res.status(200).json({ message: "Producto eliminado", product });
  } else {
    res.status(400).json({ message: "Error al eliminar el producto" });
  }
});

// Exportando la instancia del enrutador para usarla en otras partes de la aplicación
export default router;
