const fs = require("fs");

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./productos.json";
  }

  getProducts() {
    try {
      const data = fs.readFileSync(this.path);

      this.products = JSON.parse(data);
      console.log("Archivo leido");
    } catch (error) {
      console.error("Ocurrio un error al leer el archivo");
      if (error.errno === -4058) console.error("El archivo no existe");
      else console.error(error);
    }
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const newProduct = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return "Alguno de los campos esta incompleto, todos los campos son obligatorios";
    }
    const repeatedCode = this.products.findIndex(
      (product) => product.code === code
    );

    if (repeatedCode === -1) {
      this.products.push(newProduct);

      let newProductStr = JSON.stringify(this.products, null, 2);
      fs.writeFileSync(this.path, newProductStr);
      return "Producto añadido";
    } else {
      return "Error, el codigo del producto ya existe";
    }
  }

  getProductById(id) {
    const idCoincidence = this.products.findIndex((evento) => evento.id === id);
    if (idCoincidence === -1) {
      return "Producto no encontrado";
    } else {
      console.log("El producto elegido es: ");
      return this.products[idCoincidence];
    }
  }

  async updateProduct(id, updatedFields) {
    const idCoincidence = this.products.findIndex((evento) => evento.id === id);

    if (idCoincidence === -1) {
      return "No encontrado";
    } else {
      try {
        let selectedProduct = this.products[idCoincidence];

        Object.assign(selectedProduct, updatedFields);

        const updatedProductsStr = JSON.stringify(this.products, null, 2);

        fs.promises.writeFile(this.path, updatedProductsStr);
        console.log(this.products[idCoincidence]);
        return `El producto con el ID ${id} fue modificado correctamente.`;
      } catch (error) {
        return `Ocurrio un error al modificar el producto: ${error}`;
      }
    }
  }

  async deleteProduct(id) {
    const idCoincidence = this.products.findIndex((evento) => evento.id === id);

    if (idCoincidence === -1) {
      return "No encontrado";
    } else {
      this.products.splice(idCoincidence, 1);

      try {
        const fileContent = await fs.promises.readFile(this.path, "utf-8");
        const data = JSON.parse(fileContent);

        const updatedData = data.filter((product) => product.id !== id);

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(updatedData, null, 2)
        );

        return `El producto con el ID ${id} fue borrado correctamente`;
      } catch (error) {
        return `Error al borrar el producto. Error: ${error}`;
      }
    }
  }
}

const productManager = new ProductManager();
console.log(productManager.getProducts());
console.log(
  productManager.addProduct(
    "primera prueba, peras",
    "peras verdes maduras y ricas",
    380,
    "imagen del producto",
    "pera123",
    25
  )
);
console.log(
  productManager.addProduct(
    "segunda prueba, manzanas",
    "manzanas rojas jugosas y maduras",
    410,
    "imagen del producto",
    "manzana123",
    40
  )
);
console.log(
  "...................................-.- getProducts -.-..................................."
);
console.log(productManager.getProducts());
console.log(
  "...................................-.- getProductById -.-..................................."
);
console.log(productManager.getProductById(1));
console.log(productManager.getProductById(2));
console.log(
  "...................................-.- updateProduct -.-..................................."
);
console.log(
  productManager.updateProduct(1, {
    title: "Este producto ha sido modificado",
    stock: 0,
  })
);
console.log(
  productManager.updateProduct(2, { title: "El ID no coincide o no existe" })
);
console.log(
  "...................................-.- deleteProduct -.-..................................."
);
productManager
  .deleteProduct(1)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

productManager
  .deleteProduct(2)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

module.exports = ProductManager;
