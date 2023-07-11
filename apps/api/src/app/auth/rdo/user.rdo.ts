import { IsEmail, IsInt, IsJWT } from 'class-validator';
import { Expose } from 'class-transformer';
import { IntersectionType, PickType } from '@nestjs/swagger';
import { UserIdDto } from '../../user/dto/user-id.dto';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class UserRdo extends IntersectionType(
  PickType(CreateUserDto, ['name', 'email'] as const),
  UserIdDto
) {
  @Expose({ name: 'id' })
  @IsInt()
  public id: number;

  @Expose()
  @IsEmail()
  public email: string;
}

export class UserLoggedRdo extends PickType(UserRdo, [] as const) {
  @Expose()
  @IsJWT()
  public token: string;
}
