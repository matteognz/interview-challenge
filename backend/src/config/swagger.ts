import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API medication tracker app')
    .setDescription('API Oxyera Async Interview Challenge')
    .setVersion('1.0')
    .addTag('patients')
    .addTag('medications')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}
