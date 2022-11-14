import { Module } from '@nestjs/common';

import { GameController } from '../controller/game.controller';
import { GameService } from '../service/game/game.service';
import { GameRepository } from '../repository/game.repository';
import { GameFormatter } from '../service/game/game.formatter';
import { GameLevelKeyService } from '../service/game/game_level_key.service';

@Module({
  imports: [],
  controllers: [GameController],
  providers: [GameService, GameRepository, GameFormatter, GameLevelKeyService],
})
export class GameModule {}
