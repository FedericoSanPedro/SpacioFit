import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';

@Injectable()
export class AsistenciaService {
  constructor(private prisma: PrismaService) {}

  async registrarAsistencia(dto: CreateAsistenciaDto) {
    const fecha = new Date(dto.fecha);

    // evitar duplicados
    const existe = await this.prisma.asistencia.findFirst({
      where: {
        fecha,
        alumnoId: dto.alumnoId,
        turnoId: dto.turnoId,
      },
    });

    if (existe) {
      throw new BadRequestException('La asistencia ya existe');
    }

    const asistencia = await this.prisma.asistencia.create({
      data: {
        fecha,
        asistio: dto.asistio,
        alumnoId: dto.alumnoId,
        turnoId: dto.turnoId,
      },
    });

    // 👉 SUMA DE HORAS
    if (dto.asistio) {
      await this.prisma.alumno.update({
        where: { id: dto.alumnoId },
        data: {
          horasTotales: { increment: 1 },
        },
      });
    }

    return asistencia;
  }

}
