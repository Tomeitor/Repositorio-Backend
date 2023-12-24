class ProductManager {
  constructor() {
    this.products = [];
  }

  getProduct() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, stock = 5) {
    const newProduct = {
      id: this.products.length + 1,
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
    "manzanas",
    "manzanas ricas y saludables",
    130,
    "imagen manzana"
  )
);
console.log(
  productManager.addProduct(
    "peras",
    "peras verdes y de calidad",
    150,
    "imagen pera"
  )
);
console.log(productManager.getProduct());

console.log(productManager.getProductById({ eid: 2 }));
