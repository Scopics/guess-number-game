import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { GameEntity } from '../entity/game.entity';
import { Game } from '../model/game';
import { Result } from '../shared/util/util';

@Injectable()
export class GameRepository {
  constructor(private manager: EntityManager) {}

  public async getById(id: string): Promise<Result<Game>> {
    const gameEntity = await this.manager
      .getRepository(GameEntity)
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();

    if (gameEntity) {
      return this.convertToModel(gameEntity);
    }
  }

  public async insert(game: Game): Promise<Game> {
    const { raw } = await this.manager
      .createQueryBuilder()
      .insert()
      .into(GameEntity)
      .values({
        level: game.level,
        status: game.status,
        guessedNumber: game.guessedNumber,
      })
      .execute();

    return (await this.getById(raw[0].id)) as Game;
  }

  public async update(game: Game): Promise<Game> {
    await this.manager
      .getRepository(GameEntity)
      .createQueryBuilder()
      .update({
        level: game.level,
        status: game.status,
        guessedNumber: game.guessedNumber,
      })
      .where({ id: game.id })
      .execute();

    return await this.getById(game.id);
  }

  private convertToModel(gameEntity: GameEntity): Game {
    return new Game(
      gameEntity.id,
      gameEntity.createdAt,
      gameEntity.status,
      gameEntity.level,
      gameEntity.guessedNumber,
    );
  }
}
