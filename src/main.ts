import { NestFactory   } from '@nestjs/core';
import { ValidationPipe  } from '@nestjs/common';
import { AppModule } from './app.module';
import { SharedModule } from './shared/shared.module';
import { ConfigService } from './shared/services/config.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    const configService = app.select(SharedModule).get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.getNumber('PORT'));
}
bootstrap();
