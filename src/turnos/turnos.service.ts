import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TurnosService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.turno.findMany({
      include: {
        alumnos: {
          include: {
            user: {
              select: { name: true },
            },
          },
        },
      },
      orderBy: { hora: 'asc' },
    });
  }
}
