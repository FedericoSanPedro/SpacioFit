import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlumnosService {
  constructor(private prisma: PrismaService) {}

  private diffInDays(from: Date, to: Date): number {
      const diff = to.getTime() - from.getTime();
      return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  async getMyProfile(userId: number) {
    const alumno = await this.prisma.alumno.findUnique({
      where: { userId },
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });

    if (!alumno) throw new NotFoundException('Alumno profile not found');

    return alumno;
  }

  async getAsistenciasChart(alumnoId: number) {
    const asistencias = await this.prisma.asistencia.findMany({
      where: { alumnoId },
      orderBy: { fecha: 'asc' },
    });

    const map = new Map<string, { fecha: string; asistencias: number; faltas: number }>();

    asistencias.forEach(a => {
      const key = a.fecha.toISOString().split('T')[0];

      if (!map.has(key)) {
        map.set(key, { fecha: key, asistencias: 0, faltas: 0 });
      }

      if (a.asistio) {
        map.get(key)!.asistencias += 1;
      } else {
        map.get(key)!.faltas += 1;
      }
    });

    return Array.from(map.values());
  }

  async findAll() {
    const alumnos = await this.prisma.alumno.findMany({
      include: {
        asistencias: true,
        user: {
          select: { name: true },
        },
      },
      orderBy: {
        fechaInicio: 'asc',
      },
    });

    return alumnos.map(a => {
      const horasTotales = a.asistencias.filter(x => x.asistio).length;
      const antiguedadDias =
        Math.floor(
          (Date.now() - a.fechaInicio.getTime()) / (1000 * 60 * 60 * 24)
        );

      return {
        id: a.id,
        nombre: a.user.name,
        estado: a.estado,
        horasTotales,
        antiguedadDias,
      };
    });
  }

  async inscribirseTurno(userId: number, turnoId: number) {
    const turno = await this.prisma.turno.findUnique({
      where: { id: turnoId },
    });

    if (!turno) throw new NotFoundException('Turno no encontrado');

    const alumno = await this.prisma.alumno.findUnique({
      where: { userId },
    });

    if (!alumno) throw new NotFoundException('Alumno no encontrado');

    return this.prisma.alumno.update({
      where: { userId },
      data: {
        turnoId,
      },
      include: {
        turno: true,
        user: { select: { name: true, email: true } },
      },
    });
  }


  async getProgreso(alumnoId: number) {
    const alumno = await this.prisma.alumno.findUnique({
      where: { id: alumnoId },
      include: {
        asistencias: true,
        user: {
          select: { name: true },
        },
      },
    });

    if (!alumno) {
      throw new NotFoundException('Alumno no encontrado');
    }

    const asistenciasTotales = alumno.asistencias.filter(a => a.asistio).length;
    const faltas = alumno.asistencias.filter(a => !a.asistio).length;

    const horasTotales = asistenciasTotales; // si 1 asistencia = 1 hora

    const nivelActual = await this.prisma.nivel.findFirst({
      where: {
        horasMinimas: {
          lte: horasTotales,
        },
      },
      orderBy: {
        horasMinimas: 'desc',
      },
    });

    const proximoNivel = await this.prisma.nivel.findFirst({
      where: {
        horasMinimas: {
          gt: horasTotales,
        },
      },
      orderBy: {
        horasMinimas: 'asc',
      },
    });

    const hoy = new Date();
    const antiguedadDias = this.diffInDays(alumno.fechaInicio, hoy);

    const semanas = Math.max(1, Math.floor(antiguedadDias / 7));
    const frecuenciaSemanal = Number((asistenciasTotales / semanas).toFixed(2));

    const porcentajeProgreso = proximoNivel
      ? Math.min(100, Math.round((horasTotales / proximoNivel.horasMinimas) * 100))
      : 100;

    const ultimaFecha = alumno.asistencias.length
      ? alumno.asistencias.reduce(
          (max, a) => (a.fecha > max ? a.fecha : max),
          alumno.asistencias[0].fecha,
        )
      : alumno.fechaInicio;

    const estado = this.diffInDays(ultimaFecha, hoy) > 14 ? 'INACTIVO' : 'ACTIVO';

    return {
      alumnoId: alumno.id,
      nombre: alumno.user?.name || 'Unknown',
      horasTotales,
      asistenciasTotales,
      faltas,
      antiguedadDias,
      frecuenciaSemanal,
      nivelActual: nivelActual?.nombre ?? 'Inicial',
      porcentajeProgreso,
      horasParaProximoNivel: proximoNivel
        ? proximoNivel.horasMinimas - horasTotales
        : 0,
      estado,
    };
  }

}
