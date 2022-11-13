import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1668373114547 implements MigrationInterface {
  name = 'initial1668373114547';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."game_status_enum" AS ENUM('Idle', 'Active', 'Lost')`,
    );
    await queryRunner.query(
      `CREATE TABLE "game" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP DEFAULT now(), "level" integer NOT NULL, "guessedNumber" integer NOT NULL, "status" "public"."game_status_enum" NOT NULL DEFAULT 'Idle', CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "game"`);
    await queryRunner.query(`DROP TYPE "public"."game_status_enum"`);
  }
}
