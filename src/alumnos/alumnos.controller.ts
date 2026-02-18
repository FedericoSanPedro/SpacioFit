import { BadRequestException, Body, Controller, Get, Param, Patch, Req } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { InscribirseTurnoDto } from './dto/inscribirse-turno.dto';

@UseGuards(JwtAuthGuard)
@Controller('alumnos')
export class AlumnosController {
  constructor(private readonly alumnosService: AlumnosService) {}

  @Get('me')
  @Roles('Alumno')
  getMyProfile(@Req() req: any) {
    return this.alumnosService.getMyProfile(req.user.userId);
  }

  @Patch('me/turno')
  @Roles('Alumno')
  inscribirseTurno(
    @Req() req: any,
    @Body() dto: InscribirseTurnoDto,
  ) {
    return this.alumnosService.inscribirseTurno(req.user.userId, dto.turnoId);
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
