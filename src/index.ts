import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import customerRoutes from './routes/customer';

import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware.
app.use(cors());

app.use(bodyParser.json());

app.use('/api/customers', customerRoutes);

const startServer = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/bank', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions);

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

startServer();
