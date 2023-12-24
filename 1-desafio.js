class ProductManager {
  constructor() {
    this.products = [];
  }

  getProduct() {
    return this.products;
  }

  addProduct(code, title, description, price, thumbnail, stock = 5) {
    const codeExists = this.products.some((product) => product.code === code);

    if (codeExists) {
      console.log(`El codigo ${code} ya esta en uso. Ingrese un codigo unico`);
      return;
    }

    const newProduct = {
      id: this.products.length + 1,
      code,
      title,
      description,
      price,
      thumbnail,
      stock,
    };
    this.products.push(newProduct);
    /* return this.products; */
  }

  getProductById({ eid, uid }) {
    let result = this.products.find((evt) => evt.id === eid);
    return result === "undefined" ? "No se encuentra el producto" : result;
  }
}

const productManager = new ProductManager();

console.log(
  productManager.addProduct(
    "manzana123",
    "manzanas",
    "manzanas ricas y saludables",
    130,
    "imagen manzana"
  )
);
console.log(
  productManager.addProduct(
    "pera123",
    "peras",
    "peras verdes y de calidad",
    150,
    "imagen pera"
  )
);
console.log(productManager.getProduct());

console.log(productManager.getProductById({ eid: 2 }));
