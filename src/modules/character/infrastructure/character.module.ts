import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CommandHandlers } from '../application/commands';
import { QueryHandlers } from '../application/queries';
import { UseCases } from '../application/use-cases';
import { Controllers } from './controllers';
import { Repositories } from './persistence';
import { Providers } from './providers';

@Module({
  imports: [CqrsModule],
  controllers: [...Controllers],
  providers: [
    ...UseCases,
    ...CommandHandlers,
    ...QueryHandlers,
    ...Repositories,
    ...Providers,
  ],
})
export class CharacterModule {}
