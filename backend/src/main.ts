import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  console.log('PG HOST', process.env.POSTGRES_HOST);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Простой TodoList')
    .setDescription('Документация по REST API')
    .setVersion('1.0.0')
    .addTag('ILDAR TALIPOV')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.listen(PORT, () =>
    console.log(`Server started on port === ${PORT}`),
  );
}
bootstrap();
