import { container } from 'tsyringe';

import { IBillProvider } from '../../modules/bills/providers/IBillProvider';
import { BillProvider } from '../../modules/bills/providers/implementations/BillProvider';

container.registerSingleton<IBillProvider>(
  'BillProvider',
  BillProvider,
);
