import { Injectable } from '@nestjs/common';
import { Game } from '../../model/game';
import { GameResponse, GuessNumberResponse } from '../../interface/apiResponse';

@Injectable()
export class GameFormatter {
  public toGameResponse(game: Game): GameResponse {
    return {
      id: game.id,
      level: game.level,
      timeToGuess: game.timeToGuess,
      guessedNumberInterval: game.guessedNumberInterval,
      status: game.status,
    };
  }

  public toGuessNumberResponse(isGuessed: boolean): GuessNumberResponse {
    return {
      isGuessed,
    };
  }
}
