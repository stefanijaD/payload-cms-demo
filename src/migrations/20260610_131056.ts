import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_instructions_activate_base_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_instructions_activate_detailed_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_instructions_connect_sub_steps_base_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_instructions_connect_sub_steps_override_detailed_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_instructions_connect_shared_detailed_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_shared_steps_usage_type" AS ENUM('base', 'detailed', 'both');
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
  
  CREATE TABLE "instructions_connect_sub_steps_override_detailed" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_instructions_connect_sub_steps_override_detailed_source" DEFAULT 'inline',
  	"inline_media_id" integer,
  	"shared_step_id" integer,
  	"shared_step_group_id" integer
  );
  
  CREATE TABLE "instructions_connect_sub_steps_override_detailed_locales" (
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
  	"key" varchar
  );
  
  CREATE TABLE "instructions_connect_sub_steps_locales" (
  	"label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"settings_button_label" varchar,
  	"completion_button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "instructions_connect_shared_detailed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_instructions_connect_shared_detailed_source" DEFAULT 'inline',
  	"inline_media_id" integer,
  	"shared_step_id" integer,
  	"shared_step_group_id" integer
  );
  
  CREATE TABLE "instructions_connect_shared_detailed_locales" (
  	"inline_name" varchar,
  	"inline_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "shared_step_groups_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step_id" integer NOT NULL
  );
  
  CREATE TABLE "shared_step_groups" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"internal_name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "shared_step_groups_locales" (
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "instructions_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "instructions_steps" CASCADE;
  DROP TABLE "instructions_steps_locales" CASCADE;
  DROP TABLE "instructions_rels" CASCADE;
  ALTER TABLE "shared_steps" DROP CONSTRAINT "shared_steps_step_image_id_media_id_fk";
  
  ALTER TABLE "instructions" ALTER COLUMN "instruction_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_instructions_instruction_type";
  CREATE TYPE "public"."enum_instructions_instruction_type" AS ENUM('activate', 'connect');
  ALTER TABLE "instructions" ALTER COLUMN "instruction_type" SET DATA TYPE "public"."enum_instructions_instruction_type" USING "instruction_type"::"public"."enum_instructions_instruction_type";
  DROP INDEX "shared_steps_step_image_idx";
  ALTER TABLE "instructions_locales" ADD COLUMN "activate_title" varchar;
  ALTER TABLE "instructions_locales" ADD COLUMN "activate_description" varchar;
  ALTER TABLE "instructions_locales" ADD COLUMN "activate_primary_button_label" varchar;
  ALTER TABLE "shared_steps" ADD COLUMN "internal_name" varchar NOT NULL;
  ALTER TABLE "shared_steps" ADD COLUMN "usage_type" "enum_shared_steps_usage_type" DEFAULT 'both' NOT NULL;
  ALTER TABLE "shared_steps" ADD COLUMN "media_id" integer;
  ALTER TABLE "shared_steps_locales" ADD COLUMN "name" varchar;
  ALTER TABLE "shared_steps_locales" ADD COLUMN "description" varchar NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "shared_step_groups_id" integer;
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
  ALTER TABLE "instructions_connect_sub_steps_override_detailed" ADD CONSTRAINT "instructions_connect_sub_steps_override_detailed_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_override_detailed" ADD CONSTRAINT "instructions_connect_sub_steps_override_detailed_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_override_detailed" ADD CONSTRAINT "instructions_connect_sub_steps_override_detailed_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_override_detailed" ADD CONSTRAINT "instructions_connect_sub_steps_override_detailed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_connect_sub_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_override_detailed_locales" ADD CONSTRAINT "instructions_connect_sub_steps_override_detailed_locales__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_connect_sub_steps_override_detailed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps" ADD CONSTRAINT "instructions_connect_sub_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_locales" ADD CONSTRAINT "instructions_connect_sub_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_connect_sub_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_connect_shared_detailed" ADD CONSTRAINT "instructions_connect_shared_detailed_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_shared_detailed" ADD CONSTRAINT "instructions_connect_shared_detailed_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_shared_detailed" ADD CONSTRAINT "instructions_connect_shared_detailed_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_shared_detailed" ADD CONSTRAINT "instructions_connect_shared_detailed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_connect_shared_detailed_locales" ADD CONSTRAINT "instructions_connect_shared_detailed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_connect_shared_detailed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_step_groups_steps" ADD CONSTRAINT "shared_step_groups_steps_step_id_shared_steps_id_fk" FOREIGN KEY ("step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shared_step_groups_steps" ADD CONSTRAINT "shared_step_groups_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_step_groups_locales" ADD CONSTRAINT "shared_step_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE cascade ON UPDATE no action;
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
  CREATE INDEX "instructions_connect_sub_steps_override_detailed_order_idx" ON "instructions_connect_sub_steps_override_detailed" USING btree ("_order");
  CREATE INDEX "instructions_connect_sub_steps_override_detailed_parent_id_idx" ON "instructions_connect_sub_steps_override_detailed" USING btree ("_parent_id");
  CREATE INDEX "instructions_connect_sub_steps_override_detailed_inline__idx" ON "instructions_connect_sub_steps_override_detailed" USING btree ("inline_media_id");
  CREATE INDEX "instructions_connect_sub_steps_override_detailed_shared__idx" ON "instructions_connect_sub_steps_override_detailed" USING btree ("shared_step_id");
  CREATE INDEX "instructions_connect_sub_steps_override_detailed_share_1_idx" ON "instructions_connect_sub_steps_override_detailed" USING btree ("shared_step_group_id");
  CREATE UNIQUE INDEX "instructions_connect_sub_steps_override_detailed_locales_loc" ON "instructions_connect_sub_steps_override_detailed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "instructions_connect_sub_steps_order_idx" ON "instructions_connect_sub_steps" USING btree ("_order");
  CREATE INDEX "instructions_connect_sub_steps_parent_id_idx" ON "instructions_connect_sub_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "instructions_connect_sub_steps_locales_locale_parent_id_uniq" ON "instructions_connect_sub_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "instructions_connect_shared_detailed_order_idx" ON "instructions_connect_shared_detailed" USING btree ("_order");
  CREATE INDEX "instructions_connect_shared_detailed_parent_id_idx" ON "instructions_connect_shared_detailed" USING btree ("_parent_id");
  CREATE INDEX "instructions_connect_shared_detailed_inline_inline_media_idx" ON "instructions_connect_shared_detailed" USING btree ("inline_media_id");
  CREATE INDEX "instructions_connect_shared_detailed_shared_step_idx" ON "instructions_connect_shared_detailed" USING btree ("shared_step_id");
  CREATE INDEX "instructions_connect_shared_detailed_shared_step_group_idx" ON "instructions_connect_shared_detailed" USING btree ("shared_step_group_id");
  CREATE UNIQUE INDEX "instructions_connect_shared_detailed_locales_locale_parent_i" ON "instructions_connect_shared_detailed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "shared_step_groups_steps_order_idx" ON "shared_step_groups_steps" USING btree ("_order");
  CREATE INDEX "shared_step_groups_steps_parent_id_idx" ON "shared_step_groups_steps" USING btree ("_parent_id");
  CREATE INDEX "shared_step_groups_steps_step_idx" ON "shared_step_groups_steps" USING btree ("step_id");
  CREATE UNIQUE INDEX "shared_step_groups_internal_name_idx" ON "shared_step_groups" USING btree ("internal_name");
  CREATE INDEX "shared_step_groups_updated_at_idx" ON "shared_step_groups" USING btree ("updated_at");
  CREATE INDEX "shared_step_groups_created_at_idx" ON "shared_step_groups" USING btree ("created_at");
  CREATE UNIQUE INDEX "shared_step_groups_locales_locale_parent_id_unique" ON "shared_step_groups_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "shared_steps" ADD CONSTRAINT "shared_steps_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_shared_step_groups_fk" FOREIGN KEY ("shared_step_groups_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "shared_steps_internal_name_idx" ON "shared_steps" USING btree ("internal_name");
  CREATE INDEX "shared_steps_media_idx" ON "shared_steps" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_shared_step_groups_id_idx" ON "payload_locked_documents_rels" USING btree ("shared_step_groups_id");
  ALTER TABLE "instructions_locales" DROP COLUMN "description";
  ALTER TABLE "shared_steps" DROP COLUMN "title";
  ALTER TABLE "shared_steps" DROP COLUMN "step_image_id";
  ALTER TABLE "shared_steps_locales" DROP COLUMN "step_description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "instructions_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step_image_id" integer
  );
  
  CREATE TABLE "instructions_steps_locales" (
  	"step_description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "instructions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"shared_steps_id" integer
  );
  
  ALTER TABLE "instructions_activate_base" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_activate_base_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_activate_detailed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_activate_detailed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_sub_steps_base" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_sub_steps_base_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_sub_steps_override_detailed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_sub_steps_override_detailed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_sub_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_sub_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_shared_detailed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_shared_detailed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shared_step_groups_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shared_step_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shared_step_groups_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "instructions_activate_base" CASCADE;
  DROP TABLE "instructions_activate_base_locales" CASCADE;
  DROP TABLE "instructions_activate_detailed" CASCADE;
  DROP TABLE "instructions_activate_detailed_locales" CASCADE;
  DROP TABLE "instructions_connect_sub_steps_base" CASCADE;
  DROP TABLE "instructions_connect_sub_steps_base_locales" CASCADE;
  DROP TABLE "instructions_connect_sub_steps_override_detailed" CASCADE;
  DROP TABLE "instructions_connect_sub_steps_override_detailed_locales" CASCADE;
  DROP TABLE "instructions_connect_sub_steps" CASCADE;
  DROP TABLE "instructions_connect_sub_steps_locales" CASCADE;
  DROP TABLE "instructions_connect_shared_detailed" CASCADE;
  DROP TABLE "instructions_connect_shared_detailed_locales" CASCADE;
  DROP TABLE "shared_step_groups_steps" CASCADE;
  DROP TABLE "shared_step_groups" CASCADE;
  DROP TABLE "shared_step_groups_locales" CASCADE;
  ALTER TABLE "shared_steps" DROP CONSTRAINT "shared_steps_media_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_shared_step_groups_fk";
  
  ALTER TABLE "instructions" ALTER COLUMN "instruction_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_instructions_instruction_type";
  CREATE TYPE "public"."enum_instructions_instruction_type" AS ENUM('installation', 'activation');
  ALTER TABLE "instructions" ALTER COLUMN "instruction_type" SET DATA TYPE "public"."enum_instructions_instruction_type" USING "instruction_type"::"public"."enum_instructions_instruction_type";
  DROP INDEX "shared_steps_internal_name_idx";
  DROP INDEX "shared_steps_media_idx";
  DROP INDEX "payload_locked_documents_rels_shared_step_groups_id_idx";
  ALTER TABLE "instructions_locales" ADD COLUMN "description" varchar;
  ALTER TABLE "shared_steps" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "shared_steps" ADD COLUMN "step_image_id" integer;
  ALTER TABLE "shared_steps_locales" ADD COLUMN "step_description" varchar;
  ALTER TABLE "instructions_steps" ADD CONSTRAINT "instructions_steps_step_image_id_media_id_fk" FOREIGN KEY ("step_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_steps" ADD CONSTRAINT "instructions_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_steps_locales" ADD CONSTRAINT "instructions_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_rels" ADD CONSTRAINT "instructions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_rels" ADD CONSTRAINT "instructions_rels_shared_steps_fk" FOREIGN KEY ("shared_steps_id") REFERENCES "public"."shared_steps"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "instructions_steps_order_idx" ON "instructions_steps" USING btree ("_order");
  CREATE INDEX "instructions_steps_parent_id_idx" ON "instructions_steps" USING btree ("_parent_id");
  CREATE INDEX "instructions_steps_step_image_idx" ON "instructions_steps" USING btree ("step_image_id");
  CREATE UNIQUE INDEX "instructions_steps_locales_locale_parent_id_unique" ON "instructions_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "instructions_rels_order_idx" ON "instructions_rels" USING btree ("order");
  CREATE INDEX "instructions_rels_parent_idx" ON "instructions_rels" USING btree ("parent_id");
  CREATE INDEX "instructions_rels_path_idx" ON "instructions_rels" USING btree ("path");
  CREATE INDEX "instructions_rels_shared_steps_id_idx" ON "instructions_rels" USING btree ("shared_steps_id");
  ALTER TABLE "shared_steps" ADD CONSTRAINT "shared_steps_step_image_id_media_id_fk" FOREIGN KEY ("step_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "shared_steps_step_image_idx" ON "shared_steps" USING btree ("step_image_id");
  ALTER TABLE "instructions_locales" DROP COLUMN "activate_title";
  ALTER TABLE "instructions_locales" DROP COLUMN "activate_description";
  ALTER TABLE "instructions_locales" DROP COLUMN "activate_primary_button_label";
  ALTER TABLE "shared_steps" DROP COLUMN "internal_name";
  ALTER TABLE "shared_steps" DROP COLUMN "usage_type";
  ALTER TABLE "shared_steps" DROP COLUMN "media_id";
  ALTER TABLE "shared_steps_locales" DROP COLUMN "name";
  ALTER TABLE "shared_steps_locales" DROP COLUMN "description";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "shared_step_groups_id";
  DROP TYPE "public"."enum_instructions_activate_base_source";
  DROP TYPE "public"."enum_instructions_activate_detailed_source";
  DROP TYPE "public"."enum_instructions_connect_sub_steps_base_source";
  DROP TYPE "public"."enum_instructions_connect_sub_steps_override_detailed_source";
  DROP TYPE "public"."enum_instructions_connect_shared_detailed_source";
  DROP TYPE "public"."enum_shared_steps_usage_type";`)
}
