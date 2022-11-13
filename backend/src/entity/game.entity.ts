import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum GameStatus {
  Idle = 'Idle',
  Active = 'Active',
  Lost = 'Lost',
}

@Entity('game')
export class GameEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    nullable: true,
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    nullable: false,
  })
  level: number;

  @Column({
    nullable: false,
  })
  guessedNumber: number;

  @Column({
    type: 'enum',
    enum: GameStatus,
    default: GameStatus.Idle,
  })
  status: GameStatus;
}
