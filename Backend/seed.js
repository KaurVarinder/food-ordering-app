const { faker } = require('@faker-js/faker');
const MonogoClient = require("mongodb").MongoClient;
const _ = require("lodash");

async function main() {
    const uri = "mongodb://127.0.0.1://27017";
    const client = new MonogoClient(uri);

    try {
        await client.connect();

        const productsCollection = client.db("food-ordering").collection("products");
        const categoriesCollecetion = client.db("food-ordering").collection("categories");

        productsCollection.drop();
        let categories = ['breakfast', 'lunch', 'dinner', 'drinks'].map((category) => { return { name: category } });
        await categoriesCollecetion.insertMany(categories);

        let imageUrls = [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-S4KO_g9P-wOv7ubVgGMcRSf4wUdBoP-EAw&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSDPgo3wv3cyCLJTNPGJ6ApHN7Bv8zHuiZrg&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAInQ9vWWNRsQm2VjI5byvJ9vS1dxAsjKF2w&s'
        ]

        let products = [];
        for (let i = 0; i < 10; i += 1) {
            let newProduct = {
                name: faker.commerce.productName(),
                adjective: faker.commerce.productAdjective(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price(),
                category: _.sample(categories),
                imageUrls: _.sample(imageUrls)
            };
            products.push(newProduct);
        }
        await productsCollection.insertMany(products);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main();