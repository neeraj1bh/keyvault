import { MigrationInterface, QueryRunner } from 'typeorm';

export class Keys1716731154413 implements MigrationInterface {
  name = 'Keys1716731154413';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "key" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "key" character varying NOT NULL, "rateLimit" integer NOT NULL, "expiresAt" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_b772950f64b2d152f642d742e46" UNIQUE ("key"), CONSTRAINT "PK_5bd67cf28791e02bf07b0367ace" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "key"`);
  }
}
