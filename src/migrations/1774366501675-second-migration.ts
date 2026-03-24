import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondMigration1774366501675 implements MigrationInterface {
    name = 'SecondMigration1774366501675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form" ADD "isHaveTopics" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "rol" ALTER COLUMN "createdAt" SET DEFAULT '"2026-03-24T15:35:03.641Z"'`);
        await queryRunner.query(`ALTER TABLE "guvernment_entity" ALTER COLUMN "createdAt" SET DEFAULT '"2026-03-24T15:35:03.641Z"'`);
        await queryRunner.query(`ALTER TABLE "field" ALTER COLUMN "createdAt" SET DEFAULT '"2026-03-24T15:35:03.642Z"'`);
        await queryRunner.query(`ALTER TABLE "form" ALTER COLUMN "createdAt" SET DEFAULT '"2026-03-24T15:35:03.642Z"'`);
        await queryRunner.query(`ALTER TABLE "form_data" ALTER COLUMN "createdAt" SET DEFAULT '"2026-03-24T15:35:03.642Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_data" ALTER COLUMN "createdAt" SET DEFAULT '2026-02-26 19:06:26.077'`);
        await queryRunner.query(`ALTER TABLE "form" ALTER COLUMN "createdAt" SET DEFAULT '2026-02-26 19:06:26.076'`);
        await queryRunner.query(`ALTER TABLE "field" ALTER COLUMN "createdAt" SET DEFAULT '2026-02-26 19:06:26.076'`);
        await queryRunner.query(`ALTER TABLE "guvernment_entity" ALTER COLUMN "createdAt" SET DEFAULT '2026-02-26 19:06:26.076'`);
        await queryRunner.query(`ALTER TABLE "rol" ALTER COLUMN "createdAt" SET DEFAULT '2026-02-26 19:06:26.076'`);
        await queryRunner.query(`ALTER TABLE "form" DROP COLUMN "isHaveTopics"`);
    }

}
