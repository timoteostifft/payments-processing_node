import { Router } from 'express';

import { ValidateBillController } from '../../../modules/bills/useCases/validateBill/ValidateBillController';

const billsRoutes = Router();

const validateBillController = new ValidateBillController();

billsRoutes.get('/:digitable_line', validateBillController.handle);

export { billsRoutes };
