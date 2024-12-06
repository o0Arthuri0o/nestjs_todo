import { Injectable } from '@nestjs/common';
import { DatabaseService } from './db.provider';
// import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<string> {
    const query = `SELECT * FROM tasks`;
    try {
      const result = await new DatabaseService().query(query);
      return result.rows;
    } catch (error) {
      console.error('Error in findAll:', error.message);
      throw error;
    }
  }

  async create(task: { title: string }): Promise<any> {
    const query = `INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *`;
    try {
      const result = await this.databaseService.query(query, [
        task.title,
        false,
      ]);
      return result.rows[0];
    } catch (err) {
      console.log(err);
    }
  }

  async updateTask(id: number, task: { title?: string; completed?: boolean }) {
    const fields = [];
    const values = [];

    if (task.title) {
      fields.push('title = $' + (fields.length + 1));
      values.push(task.title);
    }

    if (task.completed) {
      fields.push('completed = $' + (fields.length + 1));
      values.push(task.completed);
    }

    const query = `UPDATE tasks SET ${fields.join(', ')} WHERE id = $${fields.length + 1}`;
    values.push(id);

    try {
      await this.databaseService.query(query, values);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteTask(id: number) {
    const query = `DELETE FROM tasks WHERE id = $1`;

    try {
      const res = await this.databaseService.query(query, [id]);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}
