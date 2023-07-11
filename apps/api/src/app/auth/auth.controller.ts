import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginUserDTO } from '../user/dto/login-user.dto';
import {
  JwtAuthGuard,
  Path,
  Prefix,
  User,
} from '@fit-friends/core';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { EmailAlreadyExistsGuard } from './guards/email-already-exists.guard';
import { AuthService } from './auth.service';
import { UserLoggedRdo, UserRdo } from './rdo/user.rdo';
import { UserExistsGuard } from './guards/user-exists.guard';
import { UserLoginGuard } from './guards/login.guard';
import { FormDataRequest } from 'nestjs-form-data';
import { UserIdDto } from '../user/dto/user-id.dto';

@ApiTags(Prefix.Auth)
@Controller(Prefix.Auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @UseGuards(EmailAlreadyExistsGuard)
  @ApiCreatedResponse({ type: UserRdo })
  @FormDataRequest()
  registerUser(@Body() dto: CreateUserDto) {
   return this.authService.registerUser(dto)
  }

  @Get(Path.Verify)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({type: UserRdo})
  @ApiUnauthorizedResponse()
  verifyUser(
    @User() {id}: UserIdDto
  ) {
    return this.authService.findUser(id);
  }

  @Post(Path.Login)
  @UseGuards(UserExistsGuard, UserLoginGuard)
  @ApiOkResponse({type: UserLoggedRdo})
  @ApiBody({ type: LoginUserDTO })
  loginUser(
    @Body() dto: LoginUserDTO
  ) {
    return this.authService.loginUser(dto);
  }
}
