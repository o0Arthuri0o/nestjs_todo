import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DatabaseService } from './db.provider';

@Module({
  controllers: [TasksController],
  providers: [TasksService, DatabaseService],
})
export class TasksModule {}
