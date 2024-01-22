import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    ...(process.env.ENV === 'production' && {
      logger: ['error'],
    }),
  });
  const configService = app.get(ConfigService);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Mitta')
    .setDescription('Mitta Parts')
    .setVersion('1.0')
    .addTag('Mitta')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
 /*  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          ...(error?.constraints && {
            message: error.constraints[Object.keys(error.constraints)[0]],
          }),
        }));
        return new BadRequestException(result);
      },
      stopAtFirstError: true,
    }),
  ); */

  await app.listen(configService.get<number>('PORT', 3000));
}
bootstrap();
