import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({
    example: 'Плохо себя ввёл',
    description: 'Причина блокировки',
  })
  readonly banReason: string;
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор пользователя',
  })
  readonly userId: string;
}
