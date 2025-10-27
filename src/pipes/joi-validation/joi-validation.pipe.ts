import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, UnprocessableEntityException } from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: Joi.ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if(!value) throw new UnprocessableEntityException("Please enter the required fields!.");
    const { error } = this.schema.validate(value, { abortEarly: false });
    if (error) {
      const messages = error.details.map(d => d.message).join(', ');
      throw new BadRequestException(`Validation failed: ${messages}`);
    }
    return value;
  }
}
