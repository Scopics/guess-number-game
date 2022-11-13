import { Injectable } from '@nestjs/common';
import { Game } from '../../model/game';
import { GameRepository } from '../../repository/game.repository';
import { ApplicationError } from '../../shared/error/applicationError';
import { GameStatus } from '../../entity/game.entity';

@Injectable()
export class GameService {
  constructor(private readonly gameRepository: GameRepository) {}

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
      await this.gameRepository.update(game);
    }

    return isGuessed;
  }

  public async start(game: Game): Promise<Game> {
    if (game.status !== GameStatus.Idle) {
      throw new ApplicationError('Forbidden to start game');
    }

    game.status = GameStatus.Active;
    return await this.gameRepository.update(game);
  }
}
