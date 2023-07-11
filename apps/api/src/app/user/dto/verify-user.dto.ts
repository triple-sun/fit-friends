import { IntersectionType, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';
import { UserIdDto } from './user-id.dto';
import { Role } from '@prisma/client';

export class VerifyUserDto extends IntersectionType(
  UserIdDto,
  PickType(CreateUserDto, ['name'] as const)
) {
  @Expose()
  role: Role;
}
