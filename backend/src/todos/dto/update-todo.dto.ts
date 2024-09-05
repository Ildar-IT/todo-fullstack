import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsMilitaryTime,
  IsNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UpdateTodoDto {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор задачи' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Должен быть числом' },
  )
  readonly id: number;

  @ApiProperty({ example: false, description: 'Статус выполнения задачи' })
  @IsBoolean({ message: 'Должен быть булевым' })
  readonly status: boolean;

  @ApiProperty({ example: 'Убраться дома', description: 'Название задачи' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(2, 50, { message: 'Не меньше 2, не больше 50 символов ' })
  readonly title: string;

  @ApiProperty({
    example: 'Почистить диван, помыть полы и тд итп',
    description: 'Описание задачи',
  })
  @IsString({ message: 'Должно быть строкой' })
  @Length(0, 255, { message: 'Не больше 255 символов' })
  readonly description: string;

  @ApiProperty({ example: '2024-05-12', description: 'Дата создания задачи' })
  @IsDateString()
  readonly date: Date;

  @ApiProperty({ example: '12:00', description: 'Время создания задачи' })
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Неккоректное время',
  })
  readonly time: string;
}
