import { HttpException, HttpStatus } from '@nestjs/common';

export class IdNotFoundException extends HttpException {
  constructor(modelName: string) {
    super(`${modelName} with this id does not exist`, HttpStatus.NOT_FOUND);
  }
}
