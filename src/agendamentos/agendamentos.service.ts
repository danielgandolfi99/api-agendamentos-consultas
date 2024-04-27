import { Injectable } from '@nestjs/common';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { DatabaseService } from 'src/database';

@Injectable()
export class AgendamentosService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createAgendamentoDto: CreateAgendamentoDto) {
    try {
      const query = `INSERT INTO agendamentos (date, patient_name, name_doctor) VALUES (?, ?, ?)`;
      const params = [
        createAgendamentoDto.date,
        createAgendamentoDto.patient_name,
        createAgendamentoDto.name_doctor,
      ];

      await this.databaseService.query(query, params);
    } catch (error) {
      console.error('Falha criar agendamento:', error);
      return undefined;
    }
    return { STATUS: 'OK' };
  }

  async findAll() {
    try {
      const query = `SELECT * FROM agendamentos`;
      const result = await this.databaseService.query(query);
      const array = JSON.parse(JSON.stringify(result[0]));

      if (array.length === 0) return undefined;
      return array;
    } catch (error) {
      console.error('Falha ao buscar agendamentos: ', error);
      return [];
    }
  }
}
