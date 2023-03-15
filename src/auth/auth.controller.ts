import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard, RequireAuthGuard, Serialize } from '../common';
import { Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { GetUserDto } from '../users/dto/get-user.dto';

@Controller('auth')
@Serialize(GetUserDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request, @Body() loginDto: LoginDto) {
    return req.user;
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }

  @Get('profile')
  @UseGuards(RequireAuthGuard)
  async profile(@Req() req: Request) {
    return req.user;
  }

  @Get('logout')
  async logout(@Req() req: Request) {
    return req.logOut(null, (err) => {
      if (err) throw new InternalServerErrorException(err.message);
    });
  }
}
