import { Schema, model } from 'mongoose';

interface ICustomer {
    name: string;
    balance: number;
}

const customerSchema = new Schema<ICustomer>({
    name: { type: String, required: true },
    balance: { type: Number, required: true, default: 0 },
});

export const Customer = model<ICustomer>('Customer', customerSchema);
