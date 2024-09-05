import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './todos.model';
import { User } from '../users/users.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [TodosController],
  providers: [TodosService],
  imports: [SequelizeModule.forFeature([User, Todo]), AuthModule],
})
export class TodosModule {}
