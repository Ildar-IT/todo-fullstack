import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 'User',
    description: 'Название роли',
  })
  readonly value: string;
  @ApiProperty({
    example: 'Обычный смертный',
    description: 'Описание роли',
  })
  readonly description: string;
}
