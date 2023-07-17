const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  // Lee los productos desde el archivo JSON
  readProducts() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al leer los productos:', error);
      return [];
    }
  }

  // Escribe los productos en el archivo JSON
  writeProducts(products) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2));
    } catch (error) {
      console.error('Error al escribir los productos:', error);
    }
  }

  // Agrega un nuevo producto
  async addProduct(product) {
    try {
      const products = this.readProducts();
      product.id = products.length + 1;
      products.push(product);
      this.writeProducts(products);
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  }

  // Obtiene todos los productos
  async getProducts() {
    try {
      const products = this.readProducts();
      return products;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      return [];
    }
  }

  // Obtiene un producto por su ID
  async getProductsById(id) {
    try {
      const products = this.readProducts();
      return products.find((product) => product.id === id);
    } catch (error) {
      console.error('Error al obtener el producto por ID:', error);
      return null;
    }
  }

  // Actualiza un producto existente
  async updateProducts(updatedProduct) {
    try {
      const products = this.readProducts();
      const index = products.findIndex((product) => product.id === updatedProduct.id);
      if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        this.writeProducts(products);
        return 'Producto actualizado exitosamente.';
      } else {
        throw new Error('Producto no encontrado.');
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      return 'Error al actualizar el producto.';
    }
  }

  // Elimina un producto por su ID
  async deleteProduct(id) {
    try {
      const products = this.readProducts();
      const index = products.findIndex((product) => product.id === id);
      if (index !== -1) {
        products.splice(index, 1);
        this.writeProducts(products);
        return 'Producto eliminado exitosamente.';
      } else {
        throw new Error('Producto no encontrado.');
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      return 'Error al eliminar el producto.';
    }
  }
}

module.exports = ProductManager;
