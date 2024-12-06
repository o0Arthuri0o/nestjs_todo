import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseService } from './tasks/db.provider';

@Module({
  imports: [TasksModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class AppModule {}
