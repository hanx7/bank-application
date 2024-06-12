import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import customerRoutes from './routes/customer';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bank'; // Default value

if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
}

const app = express();


// Use CORS middleware.
app.use(cors());

app.use(bodyParser.json());

app.use('/api/customers', customerRoutes);

const startServer = async () => {
    try {
        await mongoose.connect( mongoUri, {
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
