import { Router } from 'express';

import { ValidateBillController } from '../../../modules/bills/useCases/validateBill/ValidateBillController';
import { ensureValidBill } from '../middlewares/ensureValidBill';

const billsRoutes = Router();

const validateBillController = new ValidateBillController();

billsRoutes.get('/:digitable_line', ensureValidBill, validateBillController.handle);

export { billsRoutes };
