import {
  IUser,
} from '@fit-friends/core';
import { ApiProperty } from '@nestjs/swagger';
import { Coach, Gender, Location, Role } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsEmail, ValidateIf } from 'class-validator';

export class CreateUserDto implements Omit<IUser, 'passwordHash' | 'id'> {
  @Expose()
  @IsEmail({}, { message: 'Invalid email' })
  @ApiProperty({ name: 'User email' })
  public email: string;

  @Expose()
  @ApiProperty()
  public name: string;

  @Expose()
  @ApiProperty()
  public password: string;

  @Expose()
  public gender: Gender

  @Expose()
  public birth!: Date | null

  @Expose()
  public role: Role

  @Expose()
  public about: string

  @Expose()
  public location: Location

  @Expose()
  @ValidateIf((o) => o.role === Role.Coach)
  public coachInfo: Coach

  @Expose()
  @ValidateIf((o) => o.role === Role.Client)
  public clientInfo: Coach
}
