import {
  Body,
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
  Param,
  Query,
  UsePipes,
  Patch,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ValidationPipe } from '../pipes/validation.pipe';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Todo } from './todos.model';

@ApiTags('Задач')
@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @ApiOperation({ summary: 'Создание задачи' })
  @ApiResponse({ status: 200, type: Todo })
  @Roles('ADMIN', 'USER')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() dto: CreateTodoDto, @Request() req) {
    return this.todoService.createTodo(dto, req);
  }

  @ApiOperation({ summary: 'Получение всех задач по дате' })
  @ApiResponse({ status: 200, type: [Todo] })
  @Roles('ADMIN', 'USER')
  @UseGuards(RolesGuard)
  @Get()
  getByDate(@Query('date') date: Date, @Request() req) {
    return this.todoService.getUserTodosByDate(date, req);
  }

  @ApiOperation({ summary: 'Обновление задачи' })
  @ApiResponse({ status: 200, type: Todo })
  @Roles('ADMIN', 'USER')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Patch()
  update(@Body() dto: UpdateTodoDto, @Request() req) {
    return this.todoService.updateTodo(dto, req);
  }
  @ApiOperation({ summary: 'Получение всех задач, только для АДМИНА*' })
  @ApiResponse({ status: 200, type: [Todo] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('/all/')
  getAll(@Request() req) {
    return this.todoService.getUserTodos(req);
  }

  /* @ApiOperation({ summary: 'Получение задачи по id' })
  @ApiResponse({ status: 200, type: Todo })
  @Roles('ADMIN', 'USER')
  @UseGuards(RolesGuard)
  @Get('/:id')
  getById(@Param('id') id: number, @Request() req) {
    return this.todoService.getUserTodoById(id, req);
  }*/
}
