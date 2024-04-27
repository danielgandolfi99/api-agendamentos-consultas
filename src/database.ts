import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  private connection: mysql.Connection;

  async connect() {
    console.log('connecting to DB');
    this.connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'daniel99',
      database: 'agendamentos_consultas',
    });
  }

  async query(sql: string, values?: any[]) {
    if (!this.connection) {
      await this.connect();
    }
    return this.connection.execute(sql, values);
  }

  async disconnect() {
    if (this.connection) {
      await this.connection.end();
    }
  }
}
