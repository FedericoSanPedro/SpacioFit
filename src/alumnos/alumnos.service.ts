import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlumnosService {
  constructor(private prisma: PrismaService) {}

    private diffInDays(from: Date, to: Date): number {
        const diff = to.getTime() - from.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

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

    const hoy = new Date();

    const antiguedadDias = this.diffInDays(alumno.fechaInicio, hoy);

    const semanas = Math.max(1, Math.floor(antiguedadDias / 7));
    const frecuenciaSemanal = Number(
    (asistenciasTotales / semanas).toFixed(2),
    );

    const porcentajeProgreso = proximoNivel
    ? Math.min(
        100,
        Math.round(
            (alumno.horasTotales / proximoNivel.horasMinimas) * 100,
        ),
        )
    : 100;

    const estado =
    this.diffInDays(
        new Date(
        alumno.asistencias
            .sort((a, b) => b.fecha.getTime() - a.fecha.getTime())[0]?.fecha ??
            alumno.fechaInicio,
        ),
        hoy,
    ) > 14
        ? 'INACTIVO'
        : 'ACTIVO';

    return {
    alumnoId: alumno.id,
    nombre: alumno.nombre,
    horasTotales: alumno.horasTotales,
    asistenciasTotales,
    faltas,
    antiguedadDias,
    frecuenciaSemanal,
    nivelActual: nivelActual?.nombre ?? 'Inicial',
    porcentajeProgreso,
    horasParaProximoNivel: proximoNivel
        ? proximoNivel.horasMinimas - alumno.horasTotales
        : 0,
    estado,
    };

  }
}
