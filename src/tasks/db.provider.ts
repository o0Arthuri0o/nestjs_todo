import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: 'localhost',
      port: 5432,
      user: 'aakhusainov',
      password: '2315',
      database: 'todo_db',
    });
  }

  query(sql: string, params?: any[]): Promise<any> {
    return this.pool.query(sql, params);
  }

  async testConnection(): Promise<void> {
    try {
      await this.pool.query('SELECT 1'); // Тестовый запрос
      console.log('✅ Database connected successfully');
    } catch (error) {
      console.error('❌ Database connection failed:', error.message);
      throw error;
    }
  }
}
