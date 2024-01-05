import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateExperimentsTable1704393624946 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "${process.env.DB_SCHEMA || 'public'}"."experiment" (
            "id" SERIAL NOT NULL, 
            "name" VARCHAR(50) NULL,
            "created_at" timestamp NOT NULL,
            CONSTRAINT experiment_pkey PRIMARY KEY (id) )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE "${process.env.DB_SCHEMA || 'public'}"."experiment"`,
    );
  }
}
