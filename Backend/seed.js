const { faker } = require('@faker-js/faker');
const { MongoClient } = require("mongodb");
const _ = require("lodash");
require("dotenv").config();

async function main() {
    const uri = process.env.MONGODB_URI;

    console.log("Connecting to MongoDB with URI:", uri); // Debugging log

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas!");

        const db = client.db("food-ordering");
        const productsCollection = db.collection("products");
        const categoriesCollection = db.collection("categories");

        await categoriesCollection.deleteMany({});
        await productsCollection.deleteMany({});

        let categories = ['breakfast', 'lunch', 'dinner', 'drinks'].map(category => ({ name: category }));

        const categoryInsert = await categoriesCollection.insertMany(categories);
        console.log("Inserted categories!");

        let imageUrls = [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-S4KO_g9P-wOv7ubVgGMcRSf4wUdBoP-EAw&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSDPgo3wv3cyCLJTNPGJ6ApHN7Bv8zHuiZrg&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAInQ9vWWNRsQm2VjI5byvJ9vS1dxAsjKF2w&s'
        ];

        let products = [];
        for (let i = 0; i < 10; i++) {
            let newProduct = {
                name: faker.commerce.productName(),
                adjective: faker.commerce.productAdjective(),
                description: faker.commerce.productDescription(),
                price: parseFloat(faker.commerce.price()),
                category: _.sample(categories).name,
                imageUrl: _.sample(imageUrls)
            };
            products.push(newProduct);
        }

        const insertedProducts = await productsCollection.insertMany(products);
        console.log(`Inserted ${insertedProducts.insertedCount} products!`);

    } catch (e) {
        console.error("Error inserting data:", e);
    } finally {
        await client.close();
    }
}

main();
