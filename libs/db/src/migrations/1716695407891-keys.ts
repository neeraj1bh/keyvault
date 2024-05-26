import { MigrationInterface, QueryRunner } from 'typeorm';

export class Keys1716695407891 implements MigrationInterface {
  name = 'Keys1716695407891';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "key" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "rateLimit" integer NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_5bd67cf28791e02bf07b0367ace" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "key"`);
  }
}
