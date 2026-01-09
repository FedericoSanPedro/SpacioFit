import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';

@Injectable()
export class AsistenciaService {
  constructor(private prisma: PrismaService) {}

  async registrarAsistencia(dto: CreateAsistenciaDto) {
    const fecha = new Date(dto.fecha);

    // Regla: no puede haber dos asistencias iguales
    const existe = await this.prisma.asistencia.findFirst({
      where: {
        fecha,
        alumnoId: dto.alumnoId,
        turnoId: dto.turnoId,
      },
    });

    if (existe) {
      throw new BadRequestException(
        'Ya existe una asistencia para este alumno en esta fecha y turno',
      );
    }

    return this.prisma.asistencia.create({
      data: {
        fecha,
        asistio: dto.asistio,
        pago: dto.pago,
        alumnoId: dto.alumnoId,
        turnoId: dto.turnoId,
      },
    });
  }
}
