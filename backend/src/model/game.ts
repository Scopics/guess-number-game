import { GameStatus } from '../entity/game.entity';

export class Game {
  public readonly timeToGuess;
  public guessedNumberInterval: { from: number; to: number };
  public guessedNumber: number;

  constructor(
    public readonly id: string = '',
    public readonly createdAt: Date = new Date(),
    public status: GameStatus = GameStatus.Idle,
    public level: number = 1,
    guessedNumber?: number,
  ) {
    this.timeToGuess = level * 4 + 6;
    this.guessedNumberInterval = this.getGuessedNumberInterval();

    this.guessedNumber = guessedNumber ?? this.getRandomGuessedNumber();
  }

  private getGuessedNumberInterval() {
    return {
      from: 1,
      to: this.level * 3,
    };
  }

  private getRandomGuessedNumber(): number {
    const interval =
      this.guessedNumberInterval.to - this.guessedNumberInterval.from + 1;
    return (
      Math.trunc(Math.random() * interval) + this.guessedNumberInterval.from
    );
  }

  public nextLevel(): void {
    this.level = this.level + 1;
    this.guessedNumberInterval = this.getGuessedNumberInterval();
    this.guessedNumber = this.getRandomGuessedNumber();
  }
}
