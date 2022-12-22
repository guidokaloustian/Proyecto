class ProductManager {
    #id = 0;

    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Debe completar todos los campos");
        } else {
            const product = {
                id: this.#generarId(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            this.#validateCode(code) === undefined ?
                this.products.push(product) : console.error(`Ya existe un producto con el code "${code}".`);
        }

    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(item => item.id === id) || console.error("Not found");
    }

    #generarId() {
        this.#id++;
        return this.#id;
    }

    #validateCode(code) {
        let found = this.products.find(item => item.code === code);
        return found;
    }


}

const productManager = new ProductManager();

productManager.addProduct("Parrilla Anafe + Plancheta", "Anafe de acero aluminio",
    45000, "./image/image1", 1234, 10);
productManager.addProduct("Parrilla Gaucha", "Parrilla de 100x50 cm",
    80000, "./image/image2", 1235, 5);
productManager.addProduct("Parrilla Anafe + Plancheta", "Anafe de acero aluminio con una plancheta de regalo",
    50000, "./image/image1", 1236, 1);
productManager.addProduct("Parrilla nueva", "Parrilla 1m x 1m",
    100000, "./image/image1", 1);

console.log(productManager.getProductById(2));

console.log(productManager.getProductById(5));

console.log(productManager.getProducts());