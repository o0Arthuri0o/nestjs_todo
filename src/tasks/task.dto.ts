import { ApiProperty } from '@nestjs/swagger';

export class TaskDTO {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  id: number;
  @ApiProperty({ example: 'Купить продукты', description: 'Название задачи' })
  title: string;
  @ApiProperty({ example: false, description: 'Статус выполнения' })
  completed: boolean;
}
