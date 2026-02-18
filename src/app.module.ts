import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { PrismaModule } from './prisma/prisma.module';
import { AlumnosModule } from './alumnos/alumnos.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersModule } from './users/users.module';
import { TurnosModule } from './turnos/turnos.module';

@Module({
  imports: [AsistenciaModule, TurnosModule, UsersModule, PrismaModule, AlumnosModule, ConfigModule.forRoot({
      isGlobal: true,
    }), AuthModule],
  controllers: [AppController],
  providers: [ {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }, AppService],
})
export class AppModule {}
