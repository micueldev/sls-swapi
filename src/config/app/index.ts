import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { HttpExceptionFilter } from '../../modules/shared/infrastructure/filters/http-exception.filter';

export const setApplicationConfig = (app: INestApplication) => {
  app.setGlobalPrefix('api');
  app.enableCors();
  setGlobalPipes(app);
  setGlobalFilters(app);
  if (process.env.NODE_ENV !== 'prod') {
    setOpenApiConfig(app);
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

const setOpenApiConfig = (app: INestApplication) => {
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
    .build();

  const document = SwaggerModule.createDocument(app, configDocument, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('docs', app, document);
};
