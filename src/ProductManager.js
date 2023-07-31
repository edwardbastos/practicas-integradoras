import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async readProductsFile() {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async writeProductsFile(products) {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(product) {
    try {
      const products = await this.readProductsFile();
      const codeRepeat = products.find((p) => p.code === product.code);

      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        !product.stock
      ) {
        return "Complete all fields";
      }
      if (codeRepeat) {
        return "The insert code already exists";
      }
      let id = products.length === 0 ? 1 : products[products.length - 1].id + 1;

      products.push({ ...product, id });

      await this.writeProductsFile(products);
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    return await this.readProductsFile();
  }

  async getProductsById(id) {
    try {
      const results = await this.readProductsFile();
      const product = results.find((p) => p.id === id);

      return product ? product : "Not Found";
    } catch (error) {
      console.log(error);
      return "Not Found";
    }
  }

  async updateProduct(product) {
    try {
      const products = await this.readProductsFile();
      const productUpdate = products.find((p) => p.id === product.id);
      if (!productUpdate) {
        return `Can't find product with id: ${product.id}`;
      }
      const indexOfProduct = products.findIndex((p) => p.id === product.id);
      products[indexOfProduct] = {
        ...productUpdate,
        ...product,
      };

      await this.writeProductsFile(products);
      return products[indexOfProduct];
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.readProductsFile();
      const index = products.findIndex((p) => p.id === id);

      if (index < 0) {
        return `Can't find product with id: ${id}`;
      }
      products.splice(index, 1);

      await this.writeProductsFile(products);

      return products;
    } catch (error) {
      console.log(error);
    }
  }
}
