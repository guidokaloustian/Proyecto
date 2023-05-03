import { faker } from "@faker-js/faker"

const generateProduct = ()=> {
    const product = {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.productAdjective(),
        price: faker.commerce.price(10000, 100000),
        thumbnails: faker.image.abstract(),
        code: faker.datatype.number(10000),
        stock: faker.datatype.number(1000),
        status: faker.datatype.boolean(),

    }
    
    return product
}

export const generateProducts = ()=> {
    const products = []
    for (let i = 0; i < 100; i++) {
        const product = generateProduct()
        products.push(product)
    }
    return products
}
