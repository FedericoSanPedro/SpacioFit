import { Controller, Get, Param } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';

@Controller('alumnos')
export class AlumnosController {
  constructor(private readonly alumnosService: AlumnosService) {}

  @Get(':id/progreso')
  getProgreso(@Param('id') id: string) {
    return this.alumnosService.getProgreso(Number(id));
  }
}
