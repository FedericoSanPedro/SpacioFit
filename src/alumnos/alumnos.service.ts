import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlumnosService {
  constructor(private prisma: PrismaService) {}

  async getProgreso(alumnoId: number) {
    const alumno = await this.prisma.alumno.findUnique({
      where: { id: alumnoId },
      include: {
        asistencias: true,
      },
    });

    if (!alumno) {
      throw new NotFoundException('Alumno no encontrado');
    }

    const asistenciasTotales = alumno.asistencias.filter(a => a.asistio).length;
    const faltas = alumno.asistencias.filter(a => !a.asistio).length;

    const nivelActual = await this.prisma.nivel.findFirst({
      where: {
        horasMinimas: {
          lte: alumno.horasTotales,
        },
      },
      orderBy: {
        horasMinimas: 'desc',
      },
    });

    const proximoNivel = await this.prisma.nivel.findFirst({
      where: {
        horasMinimas: {
          gt: alumno.horasTotales,
        },
      },
      orderBy: {
        horasMinimas: 'asc',
      },
    });

    return {
      alumnoId: alumno.id,
      nombre: alumno.nombre,
      horasTotales: alumno.horasTotales,
      asistenciasTotales,
      faltas,
      nivelActual: nivelActual?.nombre ?? 'Inicial',
      horasParaProximoNivel: proximoNivel
        ? proximoNivel.horasMinimas - alumno.horasTotales
        : 0,
    };
  }
}
