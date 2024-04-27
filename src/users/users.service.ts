import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findUser(username: string, password: string): Promise<User> {
    try {
      const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
      const result = await this.databaseService.query(query);
      const array = JSON.parse(JSON.stringify(result[0]));

      if (array.length === 0) return undefined;
      return array[0];
    } catch (error) {
      console.error('Erro ao buscar usuário no banco de dados:', error);
      return undefined;
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const query = `INSERT INTO users (username, password) VALUES ('${createUserDto.username}', '${createUserDto.password}')`;
      await this.databaseService.query(query);
    } catch (error) {
      throw new BadRequestException('Erro ao criar usuário: ', error);
    }
    return { STATUS: 'OK' };
  }
}
