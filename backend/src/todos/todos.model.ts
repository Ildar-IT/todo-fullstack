import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { ApiProperty } from '@nestjs/swagger';

interface TodoCreationAttrs {
  userId: number;
  title: string;
  status: boolean;
  description: string;
  date: Date;
  time: string;
}

@Table({ tableName: 'todos' })
export class Todo extends Model<Todo, TodoCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  title: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: true })
  status: boolean;

  @Column({ type: DataType.STRING(300), unique: false, allowNull: true })
  description: string;

  @Column({ type: DataType.DATEONLY, unique: false, allowNull: false })
  date: Date;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  time: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
