import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { Size } from '../consts/size.const';
import { getENVErrorMessage } from '../utils/error.util';
import { APIEnvConfig, MailerEnvConfig, TEnvConfig } from '../configs/env.config';

export const ValidateENVProp = (validationOptions?: ValidationOptions) => {
  return function (object: TEnvConfig, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value) {
          return !!value
        },
        defaultMessage(args: ValidationArguments) {
          return getENVErrorMessage(args)
        }
      },
    });
  };
}

export const ValidateENVPort = (validationOptions?: ValidationOptions) => {
  return function (object: APIEnvConfig | MailerEnvConfig, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value) {
            return typeof value  === 'number' && value <= Size.Port.Max && value > Size.Port.Min
        },
        defaultMessage(args: ValidationArguments) {
            return getENVErrorMessage(args)
        }
      },
    });
  };
}
