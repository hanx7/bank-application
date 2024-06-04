import { Request, Response } from 'express';
import { Customer } from '../models/customer';

export const createCustomer = async (req: Request, res: Response) => {
    const { name } = req.body;
    const customer = new Customer({ name, balance: 0 });
    await customer.save();
    res.status(201).send(customer);
};

export const deposit = async (req: Request, res: Response) => {
    try {
        const { id, amount } = req.body;
        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).send({ message: 'Customer not found' });
        }
        customer.balance += amount;
        await customer.save();
        res.send(customer);
    } catch (error) {
        console.error('Deposit failed:', error);
        res.status(500).send({ message: 'Deposit failed' });
    }
};

export const withdraw = async (req: Request, res: Response) => {
    try {
        const { id, amount } = req.body;
        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).send({ message: 'Customer not found' });
        }
        if (customer.balance < amount) {
            return res.status(400).send({ message: 'Insufficient funds' });
        }
        customer.balance -= amount;
        await customer.save();
        res.send(customer);
    } catch (error) {
        console.error('Withdrawal failed:', error);
        res.status(500).send({ message: 'Withdrawal failed' });
    }
};

export const getCustomerBalance = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).send({ message: 'Customer not found' });
        }
        res.send({ balance: customer.balance });
    } catch (error) {
        console.error('Error fetching customer balance:', error);
        res.status(500).send({ message: 'Failed to fetch customer balance' });
    }
};

export const getBankBalance = async (_req: Request, res: Response) => {
    try {
        const customers = await Customer.find();
        const totalBalance = customers.reduce((acc, customer) => acc + customer.balance, 0);
        res.send({ totalBalance });
    } catch (error) {
        console.error('Error fetching bank balance:', error);
        res.status(500).send({ message: 'Failed to fetch bank balance' });
    }
};

