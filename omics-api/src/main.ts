import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  if (['local'].includes(process.env.NODE_ENV)) {
    const APP_NAME = process.env.npm_package_name;
    const APP_VERSION = process.env.npm_package_version;

    const options = new DocumentBuilder()
      .setTitle(APP_NAME)
      .setDescription(`The ${APP_NAME} API description`)
      .setVersion(APP_VERSION)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
