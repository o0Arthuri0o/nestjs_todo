import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { TaskDTO } from './task.dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все задачи' })
  @ApiOkResponse({ type: [TaskDTO] })
  findAll() {
    return this.taskService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Создать новую задачу' })
  @ApiBody({
    description: 'Данные для создания задачи',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
      },
      required: ['title'],
    },
  })
  createTask(@Body() task: { title: string }): Promise<any> {
    return this.taskService.create(task);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить задачу' })
  @ApiParam({ name: 'id', description: 'ID задачи' })
  @ApiBody({
    description: 'Данные для обновления',
    schema: {
      type: 'object',
      properties: {
        title: { title: 'string' },
        completed: { type: 'boolean' },
      },
    },
  })
  updateTask(
    @Param('id') id: number,
    @Body() task: { title?: string; completed?: boolean },
  ): Promise<any> {
    return this.taskService.updateTask(id, task);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить задачу' })
  @ApiParam({ name: 'id', description: 'ID задачи' })
  deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }
}
