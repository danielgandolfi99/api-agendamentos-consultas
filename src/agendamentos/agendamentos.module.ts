import { Module } from '@nestjs/common';
import { AgendamentosService } from './agendamentos.service';
import { AgendamentosController } from './agendamentos.controller';
import { DatabaseService } from 'src/database';

@Module({
  controllers: [AgendamentosController],
  providers: [AgendamentosService, DatabaseService],
})
export class AgendamentosModule {}
