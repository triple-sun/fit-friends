import {
  appConfig,
  formDataOptions,
  jwtOptions,
  mailerOptions,
  prismaOptions,
} from '@fit-friends/core';
import envSchema from './env/env.schema';
import envValidation from './env/env.validation';

export const apiConfig = {
  ...appConfig,
  load: [
    jwtOptions,
    prismaOptions,
    formDataOptions,
    mailerOptions,
  ],
  validate: envValidation,
  validationSchema: envSchema,
};
