import {} from 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import { connectDB } from './db/connection.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';
import { notFound } from './middleware/not-found.js';
import { productsRoute } from './routes/product.js';

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());

//routes

app.use('/api/v1/products', productsRoute);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
};

start();

