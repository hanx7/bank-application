import { Router } from 'express';
import { createCustomer, deposit, withdraw, getCustomerBalance, getBankBalance } from '../controllers/customerController';

const router = Router();

router.post('/create', createCustomer);
router.post('/deposit', deposit);
router.post('/withdraw', withdraw);
router.get('/balance/:id', getCustomerBalance);
router.get('/bank-balance', getBankBalance);

export default router;
