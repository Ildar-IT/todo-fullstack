import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './todos.model';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Op } from 'sequelize';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo) private todoRepository: typeof Todo) {}
  async createTodo(dto: CreateTodoDto, req) {
    const todo = await this.todoRepository.create({
      ...dto,
      date: new Date(dto.date),
      userId: req.user.id,
    });
    return todo;
  }

  async getUserTodos(req) {
    const todos = await this.todoRepository.findAll({
      where: { userId: req.user.id },
    });

    return todos;
  }

  async getUserTodosByDate(date, req) {
    const todos = await this.todoRepository.findAll({
      where: {
        userId: req.user.id,
        date: date,
      },
    });

    return todos;
  }

  async getUserTodoById(id, req) {
    const todo = await this.todoRepository.findOne({
      where: {
        userId: req.user.id,
        id: id,
      },
    });
    if (!todo) {
      throw new HttpException('Задачи не существует', HttpStatus.NOT_FOUND);
    }

    return todo;
  }

  async updateTodo(dto: UpdateTodoDto, req) {
    const todo = await this.todoRepository.update(
      {
        status: dto.status,
        title: dto.title,
        description: dto.description,
        date: dto.date,
        time: dto.time,
      },
      {
        where: {
          userId: req.user.id,
          id: dto.id,
        },
      },
    );
    if (todo[0] === 0) {
      throw new HttpException(
        'Задачи по такому id не существует',
        HttpStatus.NOT_FOUND,
      );
    }

    return todo;
  }
}
