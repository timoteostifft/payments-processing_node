import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { ValidateBillUseCase } from './ValidateBillUseCase';

class ValidateBillController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { digitable_line, type } = request.bill;

    const validateBillUseCase = container.resolve(ValidateBillUseCase);

    const info = await validateBillUseCase.execute({ digitable_line, type });

    return response.status(201).send(info);
  }
}

export { ValidateBillController };
