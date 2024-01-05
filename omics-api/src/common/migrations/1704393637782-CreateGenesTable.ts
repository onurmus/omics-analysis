import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGenesTable1704393637782 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "${process.env.DB_SCHEMA || 'public'}"."gene" (
              "id" SERIAL NOT NULL, 
              "experiment_id" int4 NOT NULL,
              "name" VARCHAR(50) NOT NULL,
              "transcript" text NOT NULL,
              "expressionValues" jsonb NOT NULL DEFAULT '{}',
              CONSTRAINT gene_pkey PRIMARY KEY (id) )`,
    );

    await queryRunner.query(
      `ALTER TABLE "${
        process.env.DB_SCHEMA || 'public'
      }"."gene" ADD CONSTRAINT "gene_experiment_id_fkey" FOREIGN KEY ("experiment_id") REFERENCES "${
        process.env.DB_SCHEMA || 'public'
      }"."experiment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${
        process.env.DB_SCHEMA || 'public'
      }"."gene" DROP CONSTRAINT "gene_experiment_id_fkey"`,
    );
    await queryRunner.query(
      `DROP TABLE "${process.env.DB_SCHEMA || 'public'}"."gene"`,
    );
  }
}
