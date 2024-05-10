import { Router} from 'express'
import { getAllTransactions, createTransaction,updateTransaction} from '../Transactions/controller/transactions.controller'

const router = Router();

router.get('/transactions', getAllTransactions);
router.post('/transactions', createTransaction);
router.post('/transactions/id', updateTransaction);

export default router;
