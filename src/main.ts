import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3001;

  const reflector = app.get(Reflector);

  // Guard global para JWT (primero)
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // Guard global para roles (después)
  app.useGlobalGuards(new RolesGuard(reflector));

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
