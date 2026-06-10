import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_instructions_connect_sub_steps_detailed_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_instructions_connect_sub_steps_key" AS ENUM('rename', 'turn_on', 'roaming');
  ALTER TYPE "public"."_locales" ADD VALUE 'cs' BEFORE 'en';
  ALTER TYPE "public"."_locales" ADD VALUE 'da' BEFORE 'en';
  ALTER TYPE "public"."_locales" ADD VALUE 'de' BEFORE 'en';
  ALTER TYPE "public"."_locales" ADD VALUE 'fr' BEFORE 'nl';
  ALTER TYPE "public"."_locales" ADD VALUE 'hu' BEFORE 'nl';
  ALTER TYPE "public"."_locales" ADD VALUE 'it' BEFORE 'nl';
  ALTER TYPE "public"."_locales" ADD VALUE 'ko' BEFORE 'nl';
  ALTER TYPE "public"."_locales" ADD VALUE 'no';
  ALTER TYPE "public"."_locales" ADD VALUE 'pl';
  ALTER TYPE "public"."_locales" ADD VALUE 'pt';
  ALTER TYPE "public"."_locales" ADD VALUE 'sk';
  ALTER TYPE "public"."_locales" ADD VALUE 'sv';
  ALTER TYPE "public"."_locales" ADD VALUE 'zh';
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
  
  ALTER TABLE "instructions_connect_sub_steps_override_detailed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_sub_steps_override_detailed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_sub_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_shared_detailed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_shared_detailed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "instructions_connect_sub_steps_override_detailed" CASCADE;
  DROP TABLE "instructions_connect_sub_steps_override_detailed_locales" CASCADE;
  DROP TABLE "instructions_connect_sub_steps_locales" CASCADE;
  DROP TABLE "instructions_connect_shared_detailed" CASCADE;
  DROP TABLE "instructions_connect_shared_detailed_locales" CASCADE;
  DROP TABLE "instructions_locales" CASCADE;
  ALTER TABLE "instructions_connect_sub_steps" ALTER COLUMN "key" SET DATA TYPE "public"."enum_instructions_connect_sub_steps_key" USING "key"::"public"."enum_instructions_connect_sub_steps_key";
  ALTER TABLE "instructions_connect_sub_steps_detailed" ADD CONSTRAINT "instructions_connect_sub_steps_detailed_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_detailed" ADD CONSTRAINT "instructions_connect_sub_steps_detailed_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_detailed" ADD CONSTRAINT "instructions_connect_sub_steps_detailed_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_detailed" ADD CONSTRAINT "instructions_connect_sub_steps_detailed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_connect_sub_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_detailed_locales" ADD CONSTRAINT "instructions_connect_sub_steps_detailed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_connect_sub_steps_detailed"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "instructions_connect_sub_steps_detailed_order_idx" ON "instructions_connect_sub_steps_detailed" USING btree ("_order");
  CREATE INDEX "instructions_connect_sub_steps_detailed_parent_id_idx" ON "instructions_connect_sub_steps_detailed" USING btree ("_parent_id");
  CREATE INDEX "instructions_connect_sub_steps_detailed_inline_inline_me_idx" ON "instructions_connect_sub_steps_detailed" USING btree ("inline_media_id");
  CREATE INDEX "instructions_connect_sub_steps_detailed_shared_step_idx" ON "instructions_connect_sub_steps_detailed" USING btree ("shared_step_id");
  CREATE INDEX "instructions_connect_sub_steps_detailed_shared_step_grou_idx" ON "instructions_connect_sub_steps_detailed" USING btree ("shared_step_group_id");
  CREATE UNIQUE INDEX "instructions_connect_sub_steps_detailed_locales_locale_paren" ON "instructions_connect_sub_steps_detailed_locales" USING btree ("_locale","_parent_id");
  DROP TYPE "public"."enum_instructions_connect_sub_steps_override_detailed_source";
  DROP TYPE "public"."enum_instructions_connect_shared_detailed_source";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_instructions_connect_sub_steps_override_detailed_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_instructions_connect_shared_detailed_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
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
  
  CREATE TABLE "instructions_locales" (
  	"activate_title" varchar,
  	"activate_description" varchar,
  	"activate_primary_button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "instructions_connect_sub_steps_detailed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_sub_steps_detailed_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "instructions_connect_sub_steps_detailed" CASCADE;
  DROP TABLE "instructions_connect_sub_steps_detailed_locales" CASCADE;
  ALTER TABLE "media_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "instructions_activate_base_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "instructions_activate_detailed_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "instructions_connect_sub_steps_base_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "instructions_connect_sub_steps_override_detailed_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "instructions_connect_sub_steps_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "instructions_connect_shared_detailed_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "instructions_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "shared_steps_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "shared_step_groups_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  DROP TYPE "public"."_locales";
  CREATE TYPE "public"."_locales" AS ENUM('en', 'es', 'nl');
  ALTER TABLE "media_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "instructions_activate_base_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "instructions_activate_detailed_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "instructions_connect_sub_steps_base_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "instructions_connect_sub_steps_override_detailed_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "instructions_connect_sub_steps_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "instructions_connect_shared_detailed_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "instructions_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "shared_steps_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "shared_step_groups_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "instructions_connect_sub_steps" ALTER COLUMN "key" SET DATA TYPE varchar;
  ALTER TABLE "instructions_connect_sub_steps_override_detailed" ADD CONSTRAINT "instructions_connect_sub_steps_override_detailed_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_override_detailed" ADD CONSTRAINT "instructions_connect_sub_steps_override_detailed_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_override_detailed" ADD CONSTRAINT "instructions_connect_sub_steps_override_detailed_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_override_detailed" ADD CONSTRAINT "instructions_connect_sub_steps_override_detailed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_connect_sub_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_override_detailed_locales" ADD CONSTRAINT "instructions_connect_sub_steps_override_detailed_locales__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_connect_sub_steps_override_detailed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_connect_sub_steps_locales" ADD CONSTRAINT "instructions_connect_sub_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_connect_sub_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_connect_shared_detailed" ADD CONSTRAINT "instructions_connect_shared_detailed_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_shared_detailed" ADD CONSTRAINT "instructions_connect_shared_detailed_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_shared_detailed" ADD CONSTRAINT "instructions_connect_shared_detailed_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_shared_detailed" ADD CONSTRAINT "instructions_connect_shared_detailed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_connect_shared_detailed_locales" ADD CONSTRAINT "instructions_connect_shared_detailed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_connect_shared_detailed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_locales" ADD CONSTRAINT "instructions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "instructions_connect_sub_steps_override_detailed_order_idx" ON "instructions_connect_sub_steps_override_detailed" USING btree ("_order");
  CREATE INDEX "instructions_connect_sub_steps_override_detailed_parent_id_idx" ON "instructions_connect_sub_steps_override_detailed" USING btree ("_parent_id");
  CREATE INDEX "instructions_connect_sub_steps_override_detailed_inline__idx" ON "instructions_connect_sub_steps_override_detailed" USING btree ("inline_media_id");
  CREATE INDEX "instructions_connect_sub_steps_override_detailed_shared__idx" ON "instructions_connect_sub_steps_override_detailed" USING btree ("shared_step_id");
  CREATE INDEX "instructions_connect_sub_steps_override_detailed_share_1_idx" ON "instructions_connect_sub_steps_override_detailed" USING btree ("shared_step_group_id");
  CREATE UNIQUE INDEX "instructions_connect_sub_steps_override_detailed_locales_loc" ON "instructions_connect_sub_steps_override_detailed_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "instructions_connect_sub_steps_locales_locale_parent_id_uniq" ON "instructions_connect_sub_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "instructions_connect_shared_detailed_order_idx" ON "instructions_connect_shared_detailed" USING btree ("_order");
  CREATE INDEX "instructions_connect_shared_detailed_parent_id_idx" ON "instructions_connect_shared_detailed" USING btree ("_parent_id");
  CREATE INDEX "instructions_connect_shared_detailed_inline_inline_media_idx" ON "instructions_connect_shared_detailed" USING btree ("inline_media_id");
  CREATE INDEX "instructions_connect_shared_detailed_shared_step_idx" ON "instructions_connect_shared_detailed" USING btree ("shared_step_id");
  CREATE INDEX "instructions_connect_shared_detailed_shared_step_group_idx" ON "instructions_connect_shared_detailed" USING btree ("shared_step_group_id");
  CREATE UNIQUE INDEX "instructions_connect_shared_detailed_locales_locale_parent_i" ON "instructions_connect_shared_detailed_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "instructions_locales_locale_parent_id_unique" ON "instructions_locales" USING btree ("_locale","_parent_id");
  DROP TYPE "public"."enum_instructions_connect_sub_steps_detailed_source";
  DROP TYPE "public"."enum_instructions_connect_sub_steps_key";`)
}
