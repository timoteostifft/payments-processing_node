import { Router } from 'express';

import { billsRoutes } from './bills.routes';

const router = Router();

router.use('/boleto', billsRoutes);

export { router };
