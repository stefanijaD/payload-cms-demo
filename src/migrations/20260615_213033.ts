import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_act_base_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_act_detail_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_act_manual_base_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_act_manual_detail_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_act_sub_base_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_act_sub_detail_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_act_substeps_key" AS ENUM('rename', 'turn_on', 'roaming');
  CREATE TYPE "public"."enum_conn_base_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_conn_detail_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_instructions_platform" AS ENUM('mobile', 'webapp', 'both');
  CREATE TABLE "act_base" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_act_base_source" DEFAULT 'inline',
  	"inline_media_translatable" boolean DEFAULT false,
  	"inline_media_id" integer,
  	"shared_step_id" integer,
  	"shared_step_group_id" integer
  );
  
  CREATE TABLE "act_base_locales" (
  	"inline_name" varchar,
  	"inline_description" varchar,
  	"inline_media_localized_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "act_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_act_detail_source" DEFAULT 'inline',
  	"inline_media_translatable" boolean DEFAULT false,
  	"inline_media_id" integer,
  	"shared_step_id" integer,
  	"shared_step_group_id" integer
  );
  
  CREATE TABLE "act_detail_locales" (
  	"inline_name" varchar,
  	"inline_description" varchar,
  	"inline_media_localized_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "act_manual_base" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_act_manual_base_source" DEFAULT 'inline',
  	"inline_media_translatable" boolean DEFAULT false,
  	"inline_media_id" integer,
  	"shared_step_id" integer,
  	"shared_step_group_id" integer
  );
  
  CREATE TABLE "act_manual_base_locales" (
  	"inline_name" varchar,
  	"inline_description" varchar,
  	"inline_media_localized_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "act_manual_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_act_manual_detail_source" DEFAULT 'inline',
  	"inline_media_translatable" boolean DEFAULT false,
  	"inline_media_id" integer,
  	"shared_step_id" integer,
  	"shared_step_group_id" integer
  );
  
  CREATE TABLE "act_manual_detail_locales" (
  	"inline_name" varchar,
  	"inline_description" varchar,
  	"inline_media_localized_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "act_sub_base" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_act_sub_base_source" DEFAULT 'inline',
  	"inline_media_translatable" boolean DEFAULT false,
  	"inline_media_id" integer,
  	"shared_step_id" integer,
  	"shared_step_group_id" integer
  );
  
  CREATE TABLE "act_sub_base_locales" (
  	"inline_name" varchar,
  	"inline_description" varchar,
  	"inline_media_localized_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "act_sub_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_act_sub_detail_source" DEFAULT 'inline',
  	"inline_media_translatable" boolean DEFAULT false,
  	"inline_media_id" integer,
  	"shared_step_id" integer,
  	"shared_step_group_id" integer
  );
  
  CREATE TABLE "act_sub_detail_locales" (
  	"inline_name" varchar,
  	"inline_description" varchar,
  	"inline_media_localized_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "act_substeps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" "enum_act_substeps_key"
  );
  
  CREATE TABLE "conn_base" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_conn_base_source" DEFAULT 'inline',
  	"inline_media_translatable" boolean DEFAULT false,
  	"inline_media_id" integer,
  	"shared_step_id" integer,
  	"shared_step_group_id" integer
  );
  
  CREATE TABLE "conn_base_locales" (
  	"inline_name" varchar,
  	"inline_description" varchar,
  	"inline_media_localized_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "conn_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_conn_detail_source" DEFAULT 'inline',
  	"inline_media_translatable" boolean DEFAULT false,
  	"inline_media_id" integer,
  	"shared_step_id" integer,
  	"shared_step_group_id" integer
  );
  
  CREATE TABLE "conn_detail_locales" (
  	"inline_name" varchar,
  	"inline_description" varchar,
  	"inline_media_localized_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "instructions_activate_base" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_activate_base_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_activate_detailed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_activate_detailed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_sub_steps_base" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_sub_steps_base_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_sub_steps_detailed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_sub_steps_detailed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_sub_steps" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "instructions_activate_base" CASCADE;
  DROP TABLE "instructions_activate_base_locales" CASCADE;
  DROP TABLE "instructions_activate_detailed" CASCADE;
  DROP TABLE "instructions_activate_detailed_locales" CASCADE;
  DROP TABLE "instructions_connect_sub_steps_base" CASCADE;
  DROP TABLE "instructions_connect_sub_steps_base_locales" CASCADE;
  DROP TABLE "instructions_connect_sub_steps_detailed" CASCADE;
  DROP TABLE "instructions_connect_sub_steps_detailed_locales" CASCADE;
  DROP TABLE "instructions_connect_sub_steps" CASCADE;
  ALTER TABLE "instructions" ADD COLUMN "platform" "enum_instructions_platform" DEFAULT 'both' NOT NULL;
  ALTER TABLE "shared_steps" ADD COLUMN "media_translatable" boolean DEFAULT false;
  ALTER TABLE "shared_steps_locales" ADD COLUMN "media_localized_id" integer;
  ALTER TABLE "act_base" ADD CONSTRAINT "act_base_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_base" ADD CONSTRAINT "act_base_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_base" ADD CONSTRAINT "act_base_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_base" ADD CONSTRAINT "act_base_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "act_base_locales" ADD CONSTRAINT "act_base_locales_inline_media_localized_id_media_id_fk" FOREIGN KEY ("inline_media_localized_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_base_locales" ADD CONSTRAINT "act_base_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."act_base"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "act_detail" ADD CONSTRAINT "act_detail_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_detail" ADD CONSTRAINT "act_detail_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_detail" ADD CONSTRAINT "act_detail_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_detail" ADD CONSTRAINT "act_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "act_detail_locales" ADD CONSTRAINT "act_detail_locales_inline_media_localized_id_media_id_fk" FOREIGN KEY ("inline_media_localized_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_detail_locales" ADD CONSTRAINT "act_detail_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."act_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "act_manual_base" ADD CONSTRAINT "act_manual_base_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_manual_base" ADD CONSTRAINT "act_manual_base_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_manual_base" ADD CONSTRAINT "act_manual_base_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_manual_base" ADD CONSTRAINT "act_manual_base_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "act_manual_base_locales" ADD CONSTRAINT "act_manual_base_locales_inline_media_localized_id_media_id_fk" FOREIGN KEY ("inline_media_localized_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_manual_base_locales" ADD CONSTRAINT "act_manual_base_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."act_manual_base"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "act_manual_detail" ADD CONSTRAINT "act_manual_detail_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_manual_detail" ADD CONSTRAINT "act_manual_detail_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_manual_detail" ADD CONSTRAINT "act_manual_detail_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_manual_detail" ADD CONSTRAINT "act_manual_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "act_manual_detail_locales" ADD CONSTRAINT "act_manual_detail_locales_inline_media_localized_id_media_id_fk" FOREIGN KEY ("inline_media_localized_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_manual_detail_locales" ADD CONSTRAINT "act_manual_detail_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."act_manual_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "act_sub_base" ADD CONSTRAINT "act_sub_base_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_sub_base" ADD CONSTRAINT "act_sub_base_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_sub_base" ADD CONSTRAINT "act_sub_base_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_sub_base" ADD CONSTRAINT "act_sub_base_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."act_substeps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "act_sub_base_locales" ADD CONSTRAINT "act_sub_base_locales_inline_media_localized_id_media_id_fk" FOREIGN KEY ("inline_media_localized_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_sub_base_locales" ADD CONSTRAINT "act_sub_base_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."act_sub_base"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "act_sub_detail" ADD CONSTRAINT "act_sub_detail_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_sub_detail" ADD CONSTRAINT "act_sub_detail_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_sub_detail" ADD CONSTRAINT "act_sub_detail_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_sub_detail" ADD CONSTRAINT "act_sub_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."act_substeps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "act_sub_detail_locales" ADD CONSTRAINT "act_sub_detail_locales_inline_media_localized_id_media_id_fk" FOREIGN KEY ("inline_media_localized_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_sub_detail_locales" ADD CONSTRAINT "act_sub_detail_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."act_sub_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "act_substeps" ADD CONSTRAINT "act_substeps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "conn_base" ADD CONSTRAINT "conn_base_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "conn_base" ADD CONSTRAINT "conn_base_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "conn_base" ADD CONSTRAINT "conn_base_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "conn_base" ADD CONSTRAINT "conn_base_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "conn_base_locales" ADD CONSTRAINT "conn_base_locales_inline_media_localized_id_media_id_fk" FOREIGN KEY ("inline_media_localized_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "conn_base_locales" ADD CONSTRAINT "conn_base_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."conn_base"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "conn_detail" ADD CONSTRAINT "conn_detail_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "conn_detail" ADD CONSTRAINT "conn_detail_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "conn_detail" ADD CONSTRAINT "conn_detail_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "conn_detail" ADD CONSTRAINT "conn_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "conn_detail_locales" ADD CONSTRAINT "conn_detail_locales_inline_media_localized_id_media_id_fk" FOREIGN KEY ("inline_media_localized_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "conn_detail_locales" ADD CONSTRAINT "conn_detail_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."conn_detail"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "act_base_order_idx" ON "act_base" USING btree ("_order");
  CREATE INDEX "act_base_parent_id_idx" ON "act_base" USING btree ("_parent_id");
  CREATE INDEX "act_base_inline_inline_media_idx" ON "act_base" USING btree ("inline_media_id");
  CREATE INDEX "act_base_shared_step_idx" ON "act_base" USING btree ("shared_step_id");
  CREATE INDEX "act_base_shared_step_group_idx" ON "act_base" USING btree ("shared_step_group_id");
  CREATE INDEX "act_base_inline_inline_media_localized_idx" ON "act_base_locales" USING btree ("inline_media_localized_id","_locale");
  CREATE UNIQUE INDEX "act_base_locales_locale_parent_id_unique" ON "act_base_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "act_detail_order_idx" ON "act_detail" USING btree ("_order");
  CREATE INDEX "act_detail_parent_id_idx" ON "act_detail" USING btree ("_parent_id");
  CREATE INDEX "act_detail_inline_inline_media_idx" ON "act_detail" USING btree ("inline_media_id");
  CREATE INDEX "act_detail_shared_step_idx" ON "act_detail" USING btree ("shared_step_id");
  CREATE INDEX "act_detail_shared_step_group_idx" ON "act_detail" USING btree ("shared_step_group_id");
  CREATE INDEX "act_detail_inline_inline_media_localized_idx" ON "act_detail_locales" USING btree ("inline_media_localized_id","_locale");
  CREATE UNIQUE INDEX "act_detail_locales_locale_parent_id_unique" ON "act_detail_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "act_manual_base_order_idx" ON "act_manual_base" USING btree ("_order");
  CREATE INDEX "act_manual_base_parent_id_idx" ON "act_manual_base" USING btree ("_parent_id");
  CREATE INDEX "act_manual_base_inline_inline_media_idx" ON "act_manual_base" USING btree ("inline_media_id");
  CREATE INDEX "act_manual_base_shared_step_idx" ON "act_manual_base" USING btree ("shared_step_id");
  CREATE INDEX "act_manual_base_shared_step_group_idx" ON "act_manual_base" USING btree ("shared_step_group_id");
  CREATE INDEX "act_manual_base_inline_inline_media_localized_idx" ON "act_manual_base_locales" USING btree ("inline_media_localized_id","_locale");
  CREATE UNIQUE INDEX "act_manual_base_locales_locale_parent_id_unique" ON "act_manual_base_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "act_manual_detail_order_idx" ON "act_manual_detail" USING btree ("_order");
  CREATE INDEX "act_manual_detail_parent_id_idx" ON "act_manual_detail" USING btree ("_parent_id");
  CREATE INDEX "act_manual_detail_inline_inline_media_idx" ON "act_manual_detail" USING btree ("inline_media_id");
  CREATE INDEX "act_manual_detail_shared_step_idx" ON "act_manual_detail" USING btree ("shared_step_id");
  CREATE INDEX "act_manual_detail_shared_step_group_idx" ON "act_manual_detail" USING btree ("shared_step_group_id");
  CREATE INDEX "act_manual_detail_inline_inline_media_localized_idx" ON "act_manual_detail_locales" USING btree ("inline_media_localized_id","_locale");
  CREATE UNIQUE INDEX "act_manual_detail_locales_locale_parent_id_unique" ON "act_manual_detail_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "act_sub_base_order_idx" ON "act_sub_base" USING btree ("_order");
  CREATE INDEX "act_sub_base_parent_id_idx" ON "act_sub_base" USING btree ("_parent_id");
  CREATE INDEX "act_sub_base_inline_inline_media_idx" ON "act_sub_base" USING btree ("inline_media_id");
  CREATE INDEX "act_sub_base_shared_step_idx" ON "act_sub_base" USING btree ("shared_step_id");
  CREATE INDEX "act_sub_base_shared_step_group_idx" ON "act_sub_base" USING btree ("shared_step_group_id");
  CREATE INDEX "act_sub_base_inline_inline_media_localized_idx" ON "act_sub_base_locales" USING btree ("inline_media_localized_id","_locale");
  CREATE UNIQUE INDEX "act_sub_base_locales_locale_parent_id_unique" ON "act_sub_base_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "act_sub_detail_order_idx" ON "act_sub_detail" USING btree ("_order");
  CREATE INDEX "act_sub_detail_parent_id_idx" ON "act_sub_detail" USING btree ("_parent_id");
  CREATE INDEX "act_sub_detail_inline_inline_media_idx" ON "act_sub_detail" USING btree ("inline_media_id");
  CREATE INDEX "act_sub_detail_shared_step_idx" ON "act_sub_detail" USING btree ("shared_step_id");
  CREATE INDEX "act_sub_detail_shared_step_group_idx" ON "act_sub_detail" USING btree ("shared_step_group_id");
  CREATE INDEX "act_sub_detail_inline_inline_media_localized_idx" ON "act_sub_detail_locales" USING btree ("inline_media_localized_id","_locale");
  CREATE UNIQUE INDEX "act_sub_detail_locales_locale_parent_id_unique" ON "act_sub_detail_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "act_substeps_order_idx" ON "act_substeps" USING btree ("_order");
  CREATE INDEX "act_substeps_parent_id_idx" ON "act_substeps" USING btree ("_parent_id");
  CREATE INDEX "conn_base_order_idx" ON "conn_base" USING btree ("_order");
  CREATE INDEX "conn_base_parent_id_idx" ON "conn_base" USING btree ("_parent_id");
  CREATE INDEX "conn_base_inline_inline_media_idx" ON "conn_base" USING btree ("inline_media_id");
  CREATE INDEX "conn_base_shared_step_idx" ON "conn_base" USING btree ("shared_step_id");
  CREATE INDEX "conn_base_shared_step_group_idx" ON "conn_base" USING btree ("shared_step_group_id");
  CREATE INDEX "conn_base_inline_inline_media_localized_idx" ON "conn_base_locales" USING btree ("inline_media_localized_id","_locale");
  CREATE UNIQUE INDEX "conn_base_locales_locale_parent_id_unique" ON "conn_base_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "conn_detail_order_idx" ON "conn_detail" USING btree ("_order");
  CREATE INDEX "conn_detail_parent_id_idx" ON "conn_detail" USING btree ("_parent_id");
  CREATE INDEX "conn_detail_inline_inline_media_idx" ON "conn_detail" USING btree ("inline_media_id");
  CREATE INDEX "conn_detail_shared_step_idx" ON "conn_detail" USING btree ("shared_step_id");
  CREATE INDEX "conn_detail_shared_step_group_idx" ON "conn_detail" USING btree ("shared_step_group_id");
  CREATE INDEX "conn_detail_inline_inline_media_localized_idx" ON "conn_detail_locales" USING btree ("inline_media_localized_id","_locale");
  CREATE UNIQUE INDEX "conn_detail_locales_locale_parent_id_unique" ON "conn_detail_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "shared_steps_locales" ADD CONSTRAINT "shared_steps_locales_media_localized_id_media_id_fk" FOREIGN KEY ("media_localized_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "shared_steps_media_localized_idx" ON "shared_steps_locales" USING btree ("media_localized_id","_locale");
  DROP TYPE "public"."enum_instructions_activate_base_source";
  DROP TYPE "public"."enum_instructions_activate_detailed_source";
  DROP TYPE "public"."enum_instructions_connect_sub_steps_base_source";
  DROP TYPE "public"."enum_instructions_connect_sub_steps_detailed_source";
  DROP TYPE "public"."enum_instructions_connect_sub_steps_key";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_instructions_activate_base_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_instructions_activate_detailed_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_instructions_connect_sub_steps_base_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_instructions_connect_sub_steps_detailed_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_instructions_connect_sub_steps_key" AS ENUM('rename', 'turn_on', 'roaming');
  CREATE TABLE "instructions_activate_base" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_instructions_activate_base_source" DEFAULT 'inline',
  	"inline_media_id" integer,
  	"shared_step_id" integer,
  	"shared_step_group_id" integer
  );
  
  CREATE TABLE "instructions_activate_base_locales" (
  	"inline_name" varchar,
  	"inline_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "instructions_activate_detailed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_instructions_activate_detailed_source" DEFAULT 'inline',
  	"inline_media_id" integer,
  	"shared_step_id" integer,
  	"shared_step_group_id" integer
  );
  
  CREATE TABLE "instructions_activate_detailed_locales" (
  	"inline_name" varchar,
  	"inline_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "instructions_connect_sub_steps_base" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_instructions_connect_sub_steps_base_source" DEFAULT 'inline',
  	"inline_media_id" integer,
  	"shared_step_id" integer,
  	"shared_step_group_id" integer
  );
  
  CREATE TABLE "instructions_connect_sub_steps_base_locales" (
  	"inline_name" varchar,
  	"inline_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "instructions_connect_sub_steps_detailed" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_instructions_connect_sub_steps_detailed_source" DEFAULT 'inline',
  	"inline_media_id" integer,
  	"shared_step_id" integer,
  	"shared_step_group_id" integer
  );
  
  CREATE TABLE "instructions_connect_sub_steps_detailed_locales" (
  	"inline_name" varchar,
  	"inline_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "instructions_connect_sub_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" "enum_instructions_connect_sub_steps_key"
  );
  
  ALTER TABLE "act_base" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "act_base_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "act_detail" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "act_detail_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "act_manual_base" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "act_manual_base_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "act_manual_detail" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "act_manual_detail_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "act_sub_base" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "act_sub_base_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "act_sub_detail" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "act_sub_detail_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "act_substeps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "conn_base" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "conn_base_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "conn_detail" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "conn_detail_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "act_base" CASCADE;
  DROP TABLE "act_base_locales" CASCADE;
  DROP TABLE "act_detail" CASCADE;
  DROP TABLE "act_detail_locales" CASCADE;
  DROP TABLE "act_manual_base" CASCADE;
  DROP TABLE "act_manual_base_locales" CASCADE;
  DROP TABLE "act_manual_detail" CASCADE;
  DROP TABLE "act_manual_detail_locales" CASCADE;
  DROP TABLE "act_sub_base" CASCADE;
  DROP TABLE "act_sub_base_locales" CASCADE;
  DROP TABLE "act_sub_detail" CASCADE;
  DROP TABLE "act_sub_detail_locales" CASCADE;
  DROP TABLE "act_substeps" CASCADE;
  DROP TABLE "conn_base" CASCADE;
  DROP TABLE "conn_base_locales" CASCADE;
  DROP TABLE "conn_detail" CASCADE;
  DROP TABLE "conn_detail_locales" CASCADE;
  ALTER TABLE "shared_steps_locales" DROP CONSTRAINT "shared_steps_locales_media_localized_id_media_id_fk";
  
  DROP INDEX "shared_steps_media_localized_idx";
  ALTER TABLE "instructions_activate_base" ADD CONSTRAINT "instructions_activate_base_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_activate_base" ADD CONSTRAINT "instructions_activate_base_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_activate_base" ADD CONSTRAINT "instructions_activate_base_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_activate_base" ADD CONSTRAINT "instructions_activate_base_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_activate_base_locales" ADD CONSTRAINT "instructions_activate_base_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_activate_base"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_activate_detailed" ADD CONSTRAINT "instructions_activate_detailed_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_activate_detailed" ADD CONSTRAINT "instructions_activate_detailed_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_activate_detailed" ADD CONSTRAINT "instructions_activate_detailed_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_activate_detailed" ADD CONSTRAINT "instructions_activate_detailed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_activate_detailed_locales" ADD CONSTRAINT "instructions_activate_detailed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_activate_detailed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_base" ADD CONSTRAINT "instructions_connect_sub_steps_base_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_base" ADD CONSTRAINT "instructions_connect_sub_steps_base_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_base" ADD CONSTRAINT "instructions_connect_sub_steps_base_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_base" ADD CONSTRAINT "instructions_connect_sub_steps_base_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_connect_sub_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_base_locales" ADD CONSTRAINT "instructions_connect_sub_steps_base_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_connect_sub_steps_base"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_detailed" ADD CONSTRAINT "instructions_connect_sub_steps_detailed_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_detailed" ADD CONSTRAINT "instructions_connect_sub_steps_detailed_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_detailed" ADD CONSTRAINT "instructions_connect_sub_steps_detailed_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_detailed" ADD CONSTRAINT "instructions_connect_sub_steps_detailed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_connect_sub_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_detailed_locales" ADD CONSTRAINT "instructions_connect_sub_steps_detailed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_connect_sub_steps_detailed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps" ADD CONSTRAINT "instructions_connect_sub_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "instructions_activate_base_order_idx" ON "instructions_activate_base" USING btree ("_order");
  CREATE INDEX "instructions_activate_base_parent_id_idx" ON "instructions_activate_base" USING btree ("_parent_id");
  CREATE INDEX "instructions_activate_base_inline_inline_media_idx" ON "instructions_activate_base" USING btree ("inline_media_id");
  CREATE INDEX "instructions_activate_base_shared_step_idx" ON "instructions_activate_base" USING btree ("shared_step_id");
  CREATE INDEX "instructions_activate_base_shared_step_group_idx" ON "instructions_activate_base" USING btree ("shared_step_group_id");
  CREATE UNIQUE INDEX "instructions_activate_base_locales_locale_parent_id_unique" ON "instructions_activate_base_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "instructions_activate_detailed_order_idx" ON "instructions_activate_detailed" USING btree ("_order");
  CREATE INDEX "instructions_activate_detailed_parent_id_idx" ON "instructions_activate_detailed" USING btree ("_parent_id");
  CREATE INDEX "instructions_activate_detailed_inline_inline_media_idx" ON "instructions_activate_detailed" USING btree ("inline_media_id");
  CREATE INDEX "instructions_activate_detailed_shared_step_idx" ON "instructions_activate_detailed" USING btree ("shared_step_id");
  CREATE INDEX "instructions_activate_detailed_shared_step_group_idx" ON "instructions_activate_detailed" USING btree ("shared_step_group_id");
  CREATE UNIQUE INDEX "instructions_activate_detailed_locales_locale_parent_id_uniq" ON "instructions_activate_detailed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "instructions_connect_sub_steps_base_order_idx" ON "instructions_connect_sub_steps_base" USING btree ("_order");
  CREATE INDEX "instructions_connect_sub_steps_base_parent_id_idx" ON "instructions_connect_sub_steps_base" USING btree ("_parent_id");
  CREATE INDEX "instructions_connect_sub_steps_base_inline_inline_media_idx" ON "instructions_connect_sub_steps_base" USING btree ("inline_media_id");
  CREATE INDEX "instructions_connect_sub_steps_base_shared_step_idx" ON "instructions_connect_sub_steps_base" USING btree ("shared_step_id");
  CREATE INDEX "instructions_connect_sub_steps_base_shared_step_group_idx" ON "instructions_connect_sub_steps_base" USING btree ("shared_step_group_id");
  CREATE UNIQUE INDEX "instructions_connect_sub_steps_base_locales_locale_parent_id" ON "instructions_connect_sub_steps_base_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "instructions_connect_sub_steps_detailed_order_idx" ON "instructions_connect_sub_steps_detailed" USING btree ("_order");
  CREATE INDEX "instructions_connect_sub_steps_detailed_parent_id_idx" ON "instructions_connect_sub_steps_detailed" USING btree ("_parent_id");
  CREATE INDEX "instructions_connect_sub_steps_detailed_inline_inline_me_idx" ON "instructions_connect_sub_steps_detailed" USING btree ("inline_media_id");
  CREATE INDEX "instructions_connect_sub_steps_detailed_shared_step_idx" ON "instructions_connect_sub_steps_detailed" USING btree ("shared_step_id");
  CREATE INDEX "instructions_connect_sub_steps_detailed_shared_step_grou_idx" ON "instructions_connect_sub_steps_detailed" USING btree ("shared_step_group_id");
  CREATE UNIQUE INDEX "instructions_connect_sub_steps_detailed_locales_locale_paren" ON "instructions_connect_sub_steps_detailed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "instructions_connect_sub_steps_order_idx" ON "instructions_connect_sub_steps" USING btree ("_order");
  CREATE INDEX "instructions_connect_sub_steps_parent_id_idx" ON "instructions_connect_sub_steps" USING btree ("_parent_id");
  ALTER TABLE "instructions" DROP COLUMN "platform";
  ALTER TABLE "shared_steps" DROP COLUMN "media_translatable";
  ALTER TABLE "shared_steps_locales" DROP COLUMN "media_localized_id";
  DROP TYPE "public"."enum_act_base_source";
  DROP TYPE "public"."enum_act_detail_source";
  DROP TYPE "public"."enum_act_manual_base_source";
  DROP TYPE "public"."enum_act_manual_detail_source";
  DROP TYPE "public"."enum_act_sub_base_source";
  DROP TYPE "public"."enum_act_sub_detail_source";
  DROP TYPE "public"."enum_act_substeps_key";
  DROP TYPE "public"."enum_conn_base_source";
  DROP TYPE "public"."enum_conn_detail_source";
  DROP TYPE "public"."enum_instructions_platform";`)
}
