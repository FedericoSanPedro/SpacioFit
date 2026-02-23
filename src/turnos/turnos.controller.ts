import { Controller, Get, UseGuards } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('turnos')
export class TurnosController {
  constructor(private turnosService: TurnosService) {}

  @Get()
  @Roles("Alumno", "Trainer", "Admin")
  findAll() {
    return this.turnosService.findAll();
  }
}
