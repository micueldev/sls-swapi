import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { setApplicationConfig } from 'src/config/app';
import { CHARACTER_REPOSITORY_ALIAS } from 'src/modules/character/domain/character.repository';
import { MockCharacterRepository } from 'tests/unit/character/__mocks__/mock-character.repository';
import { EmptyLogger } from 'tests/unit/shared/infrastructure/logger/empty-logger';

import Actions from './actions';
import Expects from './expects';

const getTestingApp = async (): Promise<INestApplication> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .setLogger(new EmptyLogger())
    .overrideProvider(CHARACTER_REPOSITORY_ALIAS)
    .useValue(new MockCharacterRepository())
    .compile();

  const app = moduleFixture.createNestApplication();
  setApplicationConfig(app);
  return app;
};

export default {
  ...Actions,
  ...Expects,
  getTestingApp,
};
