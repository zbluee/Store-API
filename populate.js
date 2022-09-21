import {} from 'dotenv/config';
import { Product } from './models/product.js';
import { connectDB } from './db/connection.js';
import defaultProducts from './products.json' assert {type : "json"};

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URL);
        await Product.deleteMany();
        await Product.create(defaultProducts);
        console.log('done');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();


