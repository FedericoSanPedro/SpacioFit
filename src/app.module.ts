import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AsistenciaModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
