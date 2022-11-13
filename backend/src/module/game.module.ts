import { Module } from '@nestjs/common';

import { GameController } from '../controller/game.controller';
import { GameService } from '../service/game/game.service';
import { GameRepository } from '../repository/game.repository';
import { GameFormatter } from '../service/game/game.formatter';

@Module({
  imports: [],
  controllers: [GameController],
  providers: [GameService, GameRepository, GameFormatter],
})
export class GameModule {}
