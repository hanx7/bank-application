import { Request, Response } from 'express';
import { Customer } from '../models/customer';

export const createCustomer = async (req: Request, res: Response) => {
    const { name } = req.body;
    const customer = new Customer({ name, balance: 0 });
    await customer.save();
    res.status(201).send(customer);
};

export const deposit = async (req: Request, res: Response) => {
    const { id, amount } = req.body;
    const customer = await Customer.findById(id);
    if (!customer) {
        return res.status(404).send({ message: 'Customer not found' });
    }
    customer.balance += amount;
    await customer.save();
    res.send(customer);
};

export const withdraw = async (req: Request, res: Response) => {
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
};

export const getCustomerBalance = async (req: Request, res: Response) => {
    const { id } = req.params;
    const customer = await Customer.findById(id);
    if (!customer) {
        return res.status(404).send({ message: 'Customer not found' });
    }
    res.send({ balance: customer.balance });
};

export const getBankBalance = async (_req: Request, res: Response) => {
    const customers = await Customer.find();
    const totalBalance = customers.reduce((acc, customer) => acc + customer.balance, 0);
    res.send({ totalBalance });
};
