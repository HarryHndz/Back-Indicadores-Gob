import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1771432571927 implements MigrationInterface {
    name = 'InitMigration1771432571927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "email" character varying(150) NOT NULL, "password" character varying(150) NOT NULL, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id_rol" integer, "id_guvernment" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rol" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT '"2026-02-18T16:36:22.803Z"', CONSTRAINT "PK_c93a22388638fac311781c7f2dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "guvernment_entity" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "description" character varying(250) NOT NULL, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT '"2026-02-18T16:36:22.803Z"', "isHaveSubGubernment" boolean NOT NULL DEFAULT false, "id_parent_gubernment" integer, CONSTRAINT "PK_dc276a881676ad301c4567e2bd2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "field" ("id" SERIAL NOT NULL, "key" character varying(100) NOT NULL, "label" character varying(150) NOT NULL, "active" boolean NOT NULL DEFAULT true, "type" character varying(50) NOT NULL, "yearFiscal" character varying(50) NOT NULL, "update_period" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT '"2026-02-18T16:36:22.803Z"', "validations" jsonb, "options" jsonb, "order_index" integer, "depends_on_value" character varying, "id_depends_on_field" integer, "id_form" integer, "id_topic" integer, CONSTRAINT "PK_39379bba786d7a75226b358f81e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "form" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT '"2026-02-18T16:36:22.803Z"', "id_gubernment" integer, CONSTRAINT "PK_8f72b95aa2f8ba82cf95dc7579e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "topic" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id_form" integer, CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "form_data" ("id" SERIAL NOT NULL, "data" jsonb NOT NULL, "edit" boolean NOT NULL DEFAULT false, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT '"2026-02-18T16:36:22.803Z"', "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id_form" integer, "id_topic" integer, "id_user" integer, CONSTRAINT "PK_e88b5f744d04e74477c7952cf6e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_2b5eea11ccd09286c9dbec9f916" FOREIGN KEY ("id_rol") REFERENCES "rol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6adec2611fee7ddc0d9b52810ff" FOREIGN KEY ("id_guvernment") REFERENCES "guvernment_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "guvernment_entity" ADD CONSTRAINT "FK_b0095c19ef26343acb598d62580" FOREIGN KEY ("id_parent_gubernment") REFERENCES "guvernment_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "field" ADD CONSTRAINT "FK_1a4ae9f3bbf98f05c57482acfc4" FOREIGN KEY ("id_depends_on_field") REFERENCES "field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "field" ADD CONSTRAINT "FK_b2aaf4829c9c63e81fff4fca73b" FOREIGN KEY ("id_form") REFERENCES "form"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "field" ADD CONSTRAINT "FK_1d8cd3c98648ad384bbba5fd015" FOREIGN KEY ("id_topic") REFERENCES "topic"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form" ADD CONSTRAINT "FK_d71e9793b814f8d09af8aa4742e" FOREIGN KEY ("id_gubernment") REFERENCES "guvernment_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_851f07a224079718c6e2aa142c2" FOREIGN KEY ("id_form") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form_data" ADD CONSTRAINT "FK_60f86cb55559ce5e552a0187f26" FOREIGN KEY ("id_form") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form_data" ADD CONSTRAINT "FK_a025fd9c848314f405d15a66a04" FOREIGN KEY ("id_topic") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form_data" ADD CONSTRAINT "FK_0ab1498da63b29fa28eef4edbd7" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_data" DROP CONSTRAINT "FK_0ab1498da63b29fa28eef4edbd7"`);
        await queryRunner.query(`ALTER TABLE "form_data" DROP CONSTRAINT "FK_a025fd9c848314f405d15a66a04"`);
        await queryRunner.query(`ALTER TABLE "form_data" DROP CONSTRAINT "FK_60f86cb55559ce5e552a0187f26"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_851f07a224079718c6e2aa142c2"`);
        await queryRunner.query(`ALTER TABLE "form" DROP CONSTRAINT "FK_d71e9793b814f8d09af8aa4742e"`);
        await queryRunner.query(`ALTER TABLE "field" DROP CONSTRAINT "FK_1d8cd3c98648ad384bbba5fd015"`);
        await queryRunner.query(`ALTER TABLE "field" DROP CONSTRAINT "FK_b2aaf4829c9c63e81fff4fca73b"`);
        await queryRunner.query(`ALTER TABLE "field" DROP CONSTRAINT "FK_1a4ae9f3bbf98f05c57482acfc4"`);
        await queryRunner.query(`ALTER TABLE "guvernment_entity" DROP CONSTRAINT "FK_b0095c19ef26343acb598d62580"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6adec2611fee7ddc0d9b52810ff"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_2b5eea11ccd09286c9dbec9f916"`);
        await queryRunner.query(`DROP TABLE "form_data"`);
        await queryRunner.query(`DROP TABLE "topic"`);
        await queryRunner.query(`DROP TABLE "form"`);
        await queryRunner.query(`DROP TABLE "field"`);
        await queryRunner.query(`DROP TABLE "guvernment_entity"`);
        await queryRunner.query(`DROP TABLE "rol"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
