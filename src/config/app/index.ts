import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { HttpExceptionFilter } from '../../modules/shared/infrastructure/filters/http-exception.filter';

export const setApplicationConfig = (app: INestApplication) => {
  const config = app.get<ConfigService>(ConfigService);
  app.setGlobalPrefix('api');
  app.enableCors();
  setGlobalPipes(app);
  setGlobalFilters(app);
  if (config.get<string>('NODE_ENV') !== 'prod') {
    setOpenApiConfig(app, config);
  }
};

const setGlobalPipes = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
};

const setGlobalFilters = (app: INestApplication) => {
  app.useGlobalFilters(new HttpExceptionFilter());
};

const setOpenApiConfig = (app: INestApplication, config: ConfigService) => {
  const configDocument = new DocumentBuilder()
    .setTitle('Serverless SWAPI Documentation')
    .setDescription('RESTFul API endpoints')
    .setContact(
      'MiCueLDev',
      'https://www.linkedin.com/in/miguel-cueva-lezameta-662369119',
      'micuel.dev@gmail.com',
    )
    .setLicense('AGPL', 'https://www.gnu.org/licenses/agpl-3.0.en.html')
    .setVersion('1.0.0')
    .addServer(
      `http://localhost:${config.get<number>('PORT')}/api`,
      'Local server',
    )
    .build();

  const document = SwaggerModule.createDocument(app, configDocument, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('docs', app, document);
};
