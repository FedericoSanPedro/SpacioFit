import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';

@Controller('alumnos')
export class AlumnosController {
  constructor(private readonly alumnosService: AlumnosService) {
  }

  @Get()
  findAll() {
    return this.alumnosService.findAll();
  }

  @Get(':id/asistencias-chart')
  getAsistenciasChart(@Param('id') id: string) {
    return this.alumnosService.getAsistenciasChart(Number(id));
  }

  @Get(':id/progreso')
  getProgreso(@Param('id') id: string) {
    const alumnoId = Number(id);

    if (Number.isNaN(alumnoId)) {
      throw new BadRequestException('ID de alumno inválido');
    }

    return this.alumnosService.getProgreso(alumnoId);
  }

}
