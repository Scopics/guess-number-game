import { Module } from '@nestjs/common';

import { GameLevelTimeoutService } from '../service/game/game_level_timeout.service';
import { GameLevelKeyService } from '../service/game/game_level_key.service';
import { GameRepository } from '../repository/game.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [GameLevelTimeoutService, GameLevelKeyService, GameRepository],
  exports: [GameLevelTimeoutService],
})
export class GameLevelTimeoutModule {}
