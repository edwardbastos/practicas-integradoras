// Importando la clase Router del módulo 'express'
import { Router } from "express";

// Importando la clase CartManager desde un módulo personalizado
import CartManager from "../managers/cartsManager.js";

// Importando la variable '__dirname' desde un módulo personalizado
import { __dirname } from "../utils.js";

// Creando una nueva instancia de la clase CartManager con la ruta al archivo JSON de carritos
const cartManager = new CartManager(__dirname + "/files/carts.json");

// Creando una nueva instancia de la clase Router
const router = Router();

// Definiendo una ruta para manejar las solicitudes GET a la raíz ("/")
router.get("/", async (req, res) => {
  // Obteniendo la lista de carritos desde el CartManager
  const carts = await cartManager.getCarts();

  // Comprobando si no se han creado carritos
  if (carts.length === 0) {
    res.status(200).json({ message: "No se han creado carritos" });
  } else {
    res.status(200).json({ carts });
  }
});

// Definiendo una ruta para manejar las solicitudes GET con un parámetro de ID de carrito
router.get("/:cid", async (req, res) => {
  // Analizando el parámetro 'cid' como un número entero
  const cid = parseInt(req.params.cid);

  // Obteniendo un carrito por su ID desde el CartManager
  const cart = await cartManager.getCartById(cid);

  // Comprobando si se encontró o no el carrito
  if (cart === "Not Found") {
    res.status(400).json({ message: "Carrito no encontrado" });
  } else if (cart) {
    res.status(200).json(cart);
  } else {
    res.status(400).json({ message: "Carrito no encontrado" });
  }
});

// Definiendo una ruta para manejar las solicitudes POST y crear un nuevo carrito
router.post("/", async (req, res) => {
  // Creando un nuevo carrito utilizando el CartManager
  const cart = await cartManager.createCart();

  // Manejando diferentes casos basados en el resultado de crear el carrito
  if (cart) {
    res.status(201).json({ message: "Carrito creado", cart });
  } else {
    res.status(400).json({ message: "Error al crear el carrito" });
  }
});

// Definiendo una ruta para manejar las solicitudes POST y agregar un producto a un carrito
router.post("/:cid/products/:pid", async (req, res) => {
  try {
    // Analizando los parámetros 'cid' y 'pid' como números enteros
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    // Agregando un producto a un carrito utilizando el CartManager
    await cartManager.addProductToCart(cid, pid);

    // Enviando una respuesta de éxito si se agrega el producto al carrito
    res.status(200).json({ message: "Producto agregado al carrito exitosamente." });
  } catch (error) {
    // Manejando errores y enviando una respuesta de error si ocurre una excepción
    console.error("Error al agregar el producto al carrito:", error);
    res
      .status(500)
      .json({ status: "error", message: "No se pudo agregar el producto al carrito." });
  }
});

// Exportando la instancia del enrutador para usarla en otras partes de la aplicación
export default router;
