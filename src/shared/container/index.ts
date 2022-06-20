import { container } from 'tsyringe';

import { IBillProvider } from './providers/IBillProvider';
import { BillProvider } from './providers/implementations/BillProvider';

container.registerSingleton<IBillProvider>(
  'BillProvider',
  BillProvider,
);
