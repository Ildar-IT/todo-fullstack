import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Уникальный email' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;
  @ApiProperty({ example: 'u12213фывфц', description: 'Пароль пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(5, 50, { message: 'Не меньше 5 символов' })
  readonly password: string;

  @ApiProperty({ example: 'Пингвин', description: 'Имя пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(2, 50, { message: 'Не меньше 2 символов, не больше 50' })
  readonly name: string;
}
