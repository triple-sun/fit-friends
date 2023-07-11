import { fillObject, UserEntity } from '@fit-friends/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserRdo, UserLoggedRdo } from './rdo/user.rdo';
import { UserRepository } from '../user/user.repository';
import { LoginUserDTO } from '../user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async findUser(id: number) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} was not found`)
    }

    return fillObject(UserRdo, user)
  }

  async registerUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(
      await new UserEntity(dto).setPassword(dto.password)
    );


    return fillObject(UserRdo, user);
  }

  async loginUser({email}: LoginUserDTO) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new NotFoundException(`User with id ${email} was not found`)
    }

    const {id, name, email: userEmail} = user

    const token = await this.jwtService.signAsync({ id, name, userEmail});

    return fillObject(UserLoggedRdo, {token})
  }
}
