import { Injectable } from '@nestjs/common';
import { GameLevelKeyService } from './game_level_key.service';
import { GameRepository } from '../../repository/game.repository';
import { GameStatus } from '../../entity/game.entity';

@Injectable()
export class GameLevelTimeoutService {
  constructor(
    private readonly gameLevelKeyService: GameLevelKeyService,
    private readonly gameRepository: GameRepository,
  ) {}

  public async handleRedisKeyExpired(key: string): Promise<void> {
    const { gameId, level }: { gameId: string; level: number } =
      this.gameLevelKeyService.getPayload(key);
    const game = await this.gameRepository.getById(gameId);

    if (game.level === level) {
      game.status = GameStatus.Lost;
      await this.gameRepository.update(game);
    }
  }
}
