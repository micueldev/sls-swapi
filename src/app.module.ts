import { Module } from '@nestjs/common';

import { CharacterModule } from './modules/character/infrastructure/character.module';

@Module({
  imports: [CharacterModule],
})
export class AppModule {}
