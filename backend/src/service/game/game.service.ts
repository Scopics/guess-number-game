import {Injectable} from '@nestjs/common';
import {RedisService} from 'nestjs-redis';

import {Game} from '../../model/game';
import {GameRepository} from '../../repository/game.repository';
import {ApplicationError} from '../../shared/error/applicationError';
import {GameStatus} from '../../entity/game.entity';
import {GameLevelKeyService} from './game_level_key.service';

@Injectable()
export class GameService {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly gameLevelKeyService: GameLevelKeyService,
    private readonly redisService: RedisService,
  ) {}

  public async getById(id: string): Promise<Game> {
    const game = await this.gameRepository.getById(id);

    if (!game) {
      throw new ApplicationError('Game not found');
    }

    return game;
  }

  public async create(): Promise<Game> {
    let game = new Game();
    game = await this.gameRepository.insert(game);

    return game;
  }

  public async guessNumber(
    game: Game,
    enteredNumber: number,
  ): Promise<boolean> {
    const isGuessed = game.guessedNumber === enteredNumber;

    if (game.status !== GameStatus.Active) {
      throw new ApplicationError('Forbidden to guess number');
    }

    if (isGuessed) {
      game.nextLevel();
      game.status = GameStatus.Idle;
      await this.gameRepository.update(game);

      const key = this.gameLevelKeyService.getKey({
        gameId: game.id,
        level: game.level,
      });
      const client = this.redisService.getClient('publisher');
      client.set(key, 1, 'EX', game.timeToGuess);
    }

    return isGuessed;
  }

  public async start(game: Game): Promise<Game> {
    if (game.status !== GameStatus.Idle) {
      throw new ApplicationError('Forbidden to start game');
    }

    game.status = GameStatus.Active;

    const key = this.gameLevelKeyService.getKey({
      gameId: game.id,
      level: game.level,
    });
    const client = this.redisService.getClient('publisher');
    client.set(key, 1, 'EX', game.timeToGuess);

    return await this.gameRepository.update(game);
  }
}
