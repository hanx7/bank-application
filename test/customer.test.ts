import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import customerRoutes from '../src/routes/customer';

const app = express();
app.use(bodyParser.json());
app.use('/api/customers', customerRoutes);

describe('Customer API', () => {
    it('should create a new customer', async () => {
        const response = await request(app)
            .post('/api/customers/create')
            .send({ name: 'Alice' })
            .expect(201);

        expect(response.body.name).toBe('Alice');
        expect(response.body.balance).toBe(0);
    });

    it('should deposit money to customer account', async () => {
        const customerResponse = await request(app)
            .post('/api/customers/create')
            .send({ name: 'Alice' });

        const customerId = customerResponse.body._id;

        const response = await request(app)
            .post('/api/customers/deposit')
            .send({ id: customerId, amount: 50 })
            .expect(200);

        expect(response.body.balance).toBe(50);
    });

    it('should handle deposit with negative amount', async () => {
        const customerResponse = await request(app)
            .post('/api/customers/create')
            .send({ name: 'Alice' });

        const customerId = customerResponse.body._id;

        const response = await request(app)
            .post('/api/customers/deposit')
            .send({ id: customerId, amount: -50 })
            .expect(400);

        expect(response.body.message).toBe('Deposit amount must be positive');
    });

    it('should withdraw money from customer account', async () => {
        const customerResponse = await request(app)
            .post('/api/customers/create')
            .send({ name: 'Alice' });

        const customerId = customerResponse.body._id;

        await request(app)
            .post('/api/customers/deposit')
            .send({ id: customerId, amount: 30 });

        const response = await request(app)
            .post('/api/customers/withdraw')
            .send({ id: customerId, amount: 20 })
            .expect(200);

        expect(response.body.balance).toBe(10);
    });

    it('should prevent overdraft', async () => {
        const customerResponse = await request(app)
            .post('/api/customers/create')
            .send({ name: 'Alice' });

        const customerId = customerResponse.body._id;

        await request(app)
            .post('/api/customers/deposit')
            .send({ id: customerId, amount: 30 });

        await request(app)
            .post('/api/customers/withdraw')
            .send({ id: customerId, amount: 20 });

        const response = await request(app)
            .post('/api/customers/withdraw')
            .send({ id: customerId, amount: 11 })
            .expect(400);

        expect(response.body.message).toBe('Insufficient funds');
    });

    it('should return customer balance', async () => {
        const customerResponse = await request(app)
            .post('/api/customers/create')
            .send({ name: 'Alice' });

        const customerId = customerResponse.body._id;

        await request(app)
            .post('/api/customers/deposit')
            .send({ id: customerId, amount: 50 });

        const response = await request(app)
            .get(`/api/customers/balance/${customerId}`)
            .expect(200);

        expect(response.body.balance).toBe(50);
    });

    it('should handle getting balance of non-existent customer', async () => {
        const nonExistentCustomerId = new mongoose.Types.ObjectId();

        const response = await request(app)
            .get(`/api/customers/balance/${nonExistentCustomerId}`)
            .expect(404);

        expect(response.body.message).toBe('Customer not found');
    });

    it('should return bank total balance', async () => {
        const customerResponse1 = await request(app)
            .post('/api/customers/create')
            .send({ name: 'Alice' });

        const customerResponse2 = await request(app)
            .post('/api/customers/create')
            .send({ name: 'Bob' });

        const customerId1 = customerResponse1.body._id;
        const customerId2 = customerResponse2.body._id;

        await request(app)
            .post('/api/customers/deposit')
            .send({ id: customerId1, amount: 50 });

        await request(app)
            .post('/api/customers/deposit')
            .send({ id: customerId2, amount: 50 });

        const response = await request(app)
            .get('/api/customers/bank-balance')
            .expect(200);

        expect(response.body.totalBalance).toBe(100);
    });


});
