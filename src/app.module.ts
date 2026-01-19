import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { PrismaModule } from './prisma/prisma.module';
import { AlumnosModule } from './alumnos/alumnos.module';

@Module({
  imports: [AsistenciaModule, PrismaModule, AlumnosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
