import Joi from 'joi';
import {
  apiEnvSchema,
  cliEnvSchema,
  jwtEnvSchema,
  mailerEnvSchema,
  prismaEnvSchema,
} from '@fit-friends/core';

export default Joi.object({
  ...apiEnvSchema,
  ...jwtEnvSchema,
  ...prismaEnvSchema,
  ...mailerEnvSchema,
  ...cliEnvSchema,
});
