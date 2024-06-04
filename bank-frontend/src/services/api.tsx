import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/customers',
});

export const createCustomer = (name: string) => api.post('/create', { name });
export const deposit = (id: string, amount: number) => api.post('/deposit', { id, amount });
export const withdraw = (id: string, amount: number) => api.post('/withdraw', { id, amount });
export const getCustomerBalance = (id: string) => api.get(`/balance/${id}`);
export const getBankBalance = () => api.get('/bank-balance');
