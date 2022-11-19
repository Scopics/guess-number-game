import { ApiProperty } from '@nestjs/swagger';
import { GameStatus } from '../entity/game.entity';

export class GuessedNumberInterval {
  @ApiProperty()
  from: number;

  @ApiProperty()
  to: number;
}

export class GameResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  level: number;

  @ApiProperty()
  timeToGuess: number;

  @ApiProperty({ type: GuessedNumberInterval })
  guessedNumberInterval: GuessedNumberInterval;

  @ApiProperty({ enum: GameStatus })
  status: GameStatus;
}

export class GuessNumberResponse {
  @ApiProperty()
  isGuessed: boolean;

  @ApiProperty()
  game: GameResponse;

  @ApiProperty()
  characteristic: string;
}
