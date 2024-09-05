import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import { AuthUserDto } from '../users/dto/auth-user.dto';
import { Todo } from '../todos/todos.model';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация' })
  @ApiResponse({ status: 200, type: 'Токен' })
  @UsePipes(ValidationPipe)
  @Post('/login')
  login(@Body() userDto: AuthUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Регистрация' })
  @ApiResponse({ status: 200, type: 'Токен' })
  @UsePipes(ValidationPipe)
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
