import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_instructions_activate_manual_installation_base_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_instructions_activate_manual_installation_detailed_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_instructions_activate_sub_steps_base_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_instructions_activate_sub_steps_detailed_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_instructions_activate_sub_steps_key" AS ENUM('rename', 'turn_on', 'roaming');
  CREATE TYPE "public"."enum_instructions_connect_base_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_instructions_connect_detailed_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_instructions_platform" AS ENUM('mobile', 'webapp', 'both');
  CREATE TABLE "instructions_activate_manual_installation_base" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_instructions_activate_manual_installation_base_source" DEFAULT 'inline',
  	"inline_media_translatable" boolean DEFAULT false,
  	"inline_media_id" integer,
  	"shared_step_id" integer,
  	"shared_step_group_id" integer
  );
  
  CREATE TABLE "instructions_activate_manual_installation_base_locales" (
  	"inline_name" varchar,
  	"inline_description" varchar,
  	"inline_media_localized_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "instructions_activate_manual_installation_detailed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_instructions_activate_manual_installation_detailed_source" DEFAULT 'inline',
  	"inline_media_translatable" boolean DEFAULT false,
  	"inline_media_id" integer,
  	"shared_step_id" integer,
  	"shared_step_group_id" integer
  );
  
  CREATE TABLE "instructions_activate_manual_installation_detailed_locales" (
  	"inline_name" varchar,
  	"inline_description" varchar,
  	"inline_media_localized_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "instructions_activate_sub_steps_base" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_instructions_activate_sub_steps_base_source" DEFAULT 'inline',
  	"inline_media_translatable" boolean DEFAULT false,
  	"inline_media_id" integer,
  	"shared_step_id" integer,
  	"shared_step_group_id" integer
  );
  
  CREATE TABLE "instructions_activate_sub_steps_base_locales" (
  	"inline_name" varchar,
  	"inline_description" varchar,
  	"inline_media_localized_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "instructions_activate_sub_steps_detailed" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_instructions_activate_sub_steps_detailed_source" DEFAULT 'inline',
  	"inline_media_translatable" boolean DEFAULT false,
  	"inline_media_id" integer,
  	"shared_step_id" integer,
  	"shared_step_group_id" integer
  );
  
  CREATE TABLE "instructions_activate_sub_steps_detailed_locales" (
  	"inline_name" varchar,
  	"inline_description" varchar,
  	"inline_media_localized_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "instructions_activate_sub_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" "enum_instructions_activate_sub_steps_key"
  );
  
  CREATE TABLE "instructions_connect_base" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_instructions_connect_base_source" DEFAULT 'inline',
  	"inline_media_translatable" boolean DEFAULT false,
  	"inline_media_id" integer,
  	"shared_step_id" integer,
  	"shared_step_group_id" integer
  );
  
  CREATE TABLE "instructions_connect_base_locales" (
  	"inline_name" varchar,
  	"inline_description" varchar,
  	"inline_media_localized_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "instructions_connect_detailed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_instructions_connect_detailed_source" DEFAULT 'inline',
  	"inline_media_translatable" boolean DEFAULT false,
  	"inline_media_id" integer,
  	"shared_step_id" integer,
  	"shared_step_group_id" integer
  );
  
  CREATE TABLE "instructions_connect_detailed_locales" (
  	"inline_name" varchar,
  	"inline_description" varchar,
  	"inline_media_localized_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "instructions_connect_sub_steps_base" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_sub_steps_base_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_sub_steps_detailed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_sub_steps_detailed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_sub_steps" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "instructions_connect_sub_steps_base" CASCADE;
  DROP TABLE "instructions_connect_sub_steps_base_locales" CASCADE;
  DROP TABLE "instructions_connect_sub_steps_detailed" CASCADE;
  DROP TABLE "instructions_connect_sub_steps_detailed_locales" CASCADE;
  DROP TABLE "instructions_connect_sub_steps" CASCADE;
  ALTER TABLE "instructions_activate_base" ADD COLUMN "inline_media_translatable" boolean DEFAULT false;
  ALTER TABLE "instructions_activate_base_locales" ADD COLUMN "inline_media_localized_id" integer;
  ALTER TABLE "instructions_activate_detailed" ADD COLUMN "inline_media_translatable" boolean DEFAULT false;
  ALTER TABLE "instructions_activate_detailed_locales" ADD COLUMN "inline_media_localized_id" integer;
  ALTER TABLE "instructions" ADD COLUMN "platform" "enum_instructions_platform" DEFAULT 'both' NOT NULL;
  ALTER TABLE "shared_steps" ADD COLUMN "media_translatable" boolean DEFAULT false;
  ALTER TABLE "shared_steps_locales" ADD COLUMN "media_localized_id" integer;
  ALTER TABLE "instructions_activate_manual_installation_base" ADD CONSTRAINT "instructions_activate_manual_installation_base_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_activate_manual_installation_base" ADD CONSTRAINT "instructions_activate_manual_installation_base_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_activate_manual_installation_base" ADD CONSTRAINT "instructions_activate_manual_installation_base_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_activate_manual_installation_base" ADD CONSTRAINT "instructions_activate_manual_installation_base_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_activate_manual_installation_base_locales" ADD CONSTRAINT "instructions_activate_manual_installation_base_locales_inline_media_localized_id_media_id_fk" FOREIGN KEY ("inline_media_localized_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_activate_manual_installation_base_locales" ADD CONSTRAINT "instructions_activate_manual_installation_base_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_activate_manual_installation_base"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_activate_manual_installation_detailed" ADD CONSTRAINT "instructions_activate_manual_installation_detailed_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_activate_manual_installation_detailed" ADD CONSTRAINT "instructions_activate_manual_installation_detailed_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_activate_manual_installation_detailed" ADD CONSTRAINT "instructions_activate_manual_installation_detailed_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_activate_manual_installation_detailed" ADD CONSTRAINT "instructions_activate_manual_installation_detailed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_activate_manual_installation_detailed_locales" ADD CONSTRAINT "instructions_activate_manual_installation_detailed_locales_inline_media_localized_id_media_id_fk" FOREIGN KEY ("inline_media_localized_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_activate_manual_installation_detailed_locales" ADD CONSTRAINT "instructions_activate_manual_installation_detailed_locale_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_activate_manual_installation_detailed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_activate_sub_steps_base" ADD CONSTRAINT "instructions_activate_sub_steps_base_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_activate_sub_steps_base" ADD CONSTRAINT "instructions_activate_sub_steps_base_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_activate_sub_steps_base" ADD CONSTRAINT "instructions_activate_sub_steps_base_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_activate_sub_steps_base" ADD CONSTRAINT "instructions_activate_sub_steps_base_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_activate_sub_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_activate_sub_steps_base_locales" ADD CONSTRAINT "instructions_activate_sub_steps_base_locales_inline_media_localized_id_media_id_fk" FOREIGN KEY ("inline_media_localized_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_activate_sub_steps_base_locales" ADD CONSTRAINT "instructions_activate_sub_steps_base_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_activate_sub_steps_base"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_activate_sub_steps_detailed" ADD CONSTRAINT "instructions_activate_sub_steps_detailed_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_activate_sub_steps_detailed" ADD CONSTRAINT "instructions_activate_sub_steps_detailed_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_activate_sub_steps_detailed" ADD CONSTRAINT "instructions_activate_sub_steps_detailed_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_activate_sub_steps_detailed" ADD CONSTRAINT "instructions_activate_sub_steps_detailed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_activate_sub_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_activate_sub_steps_detailed_locales" ADD CONSTRAINT "instructions_activate_sub_steps_detailed_locales_inline_media_localized_id_media_id_fk" FOREIGN KEY ("inline_media_localized_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_activate_sub_steps_detailed_locales" ADD CONSTRAINT "instructions_activate_sub_steps_detailed_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_activate_sub_steps_detailed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_activate_sub_steps" ADD CONSTRAINT "instructions_activate_sub_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_connect_base" ADD CONSTRAINT "instructions_connect_base_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_base" ADD CONSTRAINT "instructions_connect_base_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_base" ADD CONSTRAINT "instructions_connect_base_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_base" ADD CONSTRAINT "instructions_connect_base_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_connect_base_locales" ADD CONSTRAINT "instructions_connect_base_locales_inline_media_localized_id_media_id_fk" FOREIGN KEY ("inline_media_localized_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_base_locales" ADD CONSTRAINT "instructions_connect_base_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_connect_base"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_connect_detailed" ADD CONSTRAINT "instructions_connect_detailed_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_detailed" ADD CONSTRAINT "instructions_connect_detailed_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_detailed" ADD CONSTRAINT "instructions_connect_detailed_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_detailed" ADD CONSTRAINT "instructions_connect_detailed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructions_connect_detailed_locales" ADD CONSTRAINT "instructions_connect_detailed_locales_inline_media_localized_id_media_id_fk" FOREIGN KEY ("inline_media_localized_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_connect_detailed_locales" ADD CONSTRAINT "instructions_connect_detailed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions_connect_detailed"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "instructions_activate_manual_installation_base_order_idx" ON "instructions_activate_manual_installation_base" USING btree ("_order");
  CREATE INDEX "instructions_activate_manual_installation_base_parent_id_idx" ON "instructions_activate_manual_installation_base" USING btree ("_parent_id");
  CREATE INDEX "instructions_activate_manual_installation_base_inline_in_idx" ON "instructions_activate_manual_installation_base" USING btree ("inline_media_id");
  CREATE INDEX "instructions_activate_manual_installation_base_shared_st_idx" ON "instructions_activate_manual_installation_base" USING btree ("shared_step_id");
  CREATE INDEX "instructions_activate_manual_installation_base_shared__1_idx" ON "instructions_activate_manual_installation_base" USING btree ("shared_step_group_id");
  CREATE INDEX "instructions_activate_manual_installation_base_inline__1_idx" ON "instructions_activate_manual_installation_base_locales" USING btree ("inline_media_localized_id","_locale");
  CREATE UNIQUE INDEX "instructions_activate_manual_installation_base_locales_local" ON "instructions_activate_manual_installation_base_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "instructions_activate_manual_installation_detailed_order_idx" ON "instructions_activate_manual_installation_detailed" USING btree ("_order");
  CREATE INDEX "instructions_activate_manual_installation_detailed_parent_id_idx" ON "instructions_activate_manual_installation_detailed" USING btree ("_parent_id");
  CREATE INDEX "instructions_activate_manual_installation_detailed_inlin_idx" ON "instructions_activate_manual_installation_detailed" USING btree ("inline_media_id");
  CREATE INDEX "instructions_activate_manual_installation_detailed_share_idx" ON "instructions_activate_manual_installation_detailed" USING btree ("shared_step_id");
  CREATE INDEX "instructions_activate_manual_installation_detailed_sha_1_idx" ON "instructions_activate_manual_installation_detailed" USING btree ("shared_step_group_id");
  CREATE INDEX "instructions_activate_manual_installation_detailed_inl_1_idx" ON "instructions_activate_manual_installation_detailed_locales" USING btree ("inline_media_localized_id","_locale");
  CREATE UNIQUE INDEX "instructions_activate_manual_installation_detailed_locales_l" ON "instructions_activate_manual_installation_detailed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "instructions_activate_sub_steps_base_order_idx" ON "instructions_activate_sub_steps_base" USING btree ("_order");
  CREATE INDEX "instructions_activate_sub_steps_base_parent_id_idx" ON "instructions_activate_sub_steps_base" USING btree ("_parent_id");
  CREATE INDEX "instructions_activate_sub_steps_base_inline_inline_media_idx" ON "instructions_activate_sub_steps_base" USING btree ("inline_media_id");
  CREATE INDEX "instructions_activate_sub_steps_base_shared_step_idx" ON "instructions_activate_sub_steps_base" USING btree ("shared_step_id");
  CREATE INDEX "instructions_activate_sub_steps_base_shared_step_group_idx" ON "instructions_activate_sub_steps_base" USING btree ("shared_step_group_id");
  CREATE INDEX "instructions_activate_sub_steps_base_inline_inline_med_1_idx" ON "instructions_activate_sub_steps_base_locales" USING btree ("inline_media_localized_id","_locale");
  CREATE UNIQUE INDEX "instructions_activate_sub_steps_base_locales_locale_parent_i" ON "instructions_activate_sub_steps_base_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "instructions_activate_sub_steps_detailed_order_idx" ON "instructions_activate_sub_steps_detailed" USING btree ("_order");
  CREATE INDEX "instructions_activate_sub_steps_detailed_parent_id_idx" ON "instructions_activate_sub_steps_detailed" USING btree ("_parent_id");
  CREATE INDEX "instructions_activate_sub_steps_detailed_inline_inline_m_idx" ON "instructions_activate_sub_steps_detailed" USING btree ("inline_media_id");
  CREATE INDEX "instructions_activate_sub_steps_detailed_shared_step_idx" ON "instructions_activate_sub_steps_detailed" USING btree ("shared_step_id");
  CREATE INDEX "instructions_activate_sub_steps_detailed_shared_step_gro_idx" ON "instructions_activate_sub_steps_detailed" USING btree ("shared_step_group_id");
  CREATE INDEX "instructions_activate_sub_steps_detailed_inline_inline_1_idx" ON "instructions_activate_sub_steps_detailed_locales" USING btree ("inline_media_localized_id","_locale");
  CREATE UNIQUE INDEX "instructions_activate_sub_steps_detailed_locales_locale_pare" ON "instructions_activate_sub_steps_detailed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "instructions_activate_sub_steps_order_idx" ON "instructions_activate_sub_steps" USING btree ("_order");
  CREATE INDEX "instructions_activate_sub_steps_parent_id_idx" ON "instructions_activate_sub_steps" USING btree ("_parent_id");
  CREATE INDEX "instructions_connect_base_order_idx" ON "instructions_connect_base" USING btree ("_order");
  CREATE INDEX "instructions_connect_base_parent_id_idx" ON "instructions_connect_base" USING btree ("_parent_id");
  CREATE INDEX "instructions_connect_base_inline_inline_media_idx" ON "instructions_connect_base" USING btree ("inline_media_id");
  CREATE INDEX "instructions_connect_base_shared_step_idx" ON "instructions_connect_base" USING btree ("shared_step_id");
  CREATE INDEX "instructions_connect_base_shared_step_group_idx" ON "instructions_connect_base" USING btree ("shared_step_group_id");
  CREATE INDEX "instructions_connect_base_inline_inline_media_localized_idx" ON "instructions_connect_base_locales" USING btree ("inline_media_localized_id","_locale");
  CREATE UNIQUE INDEX "instructions_connect_base_locales_locale_parent_id_unique" ON "instructions_connect_base_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "instructions_connect_detailed_order_idx" ON "instructions_connect_detailed" USING btree ("_order");
  CREATE INDEX "instructions_connect_detailed_parent_id_idx" ON "instructions_connect_detailed" USING btree ("_parent_id");
  CREATE INDEX "instructions_connect_detailed_inline_inline_media_idx" ON "instructions_connect_detailed" USING btree ("inline_media_id");
  CREATE INDEX "instructions_connect_detailed_shared_step_idx" ON "instructions_connect_detailed" USING btree ("shared_step_id");
  CREATE INDEX "instructions_connect_detailed_shared_step_group_idx" ON "instructions_connect_detailed" USING btree ("shared_step_group_id");
  CREATE INDEX "instructions_connect_detailed_inline_inline_media_locali_idx" ON "instructions_connect_detailed_locales" USING btree ("inline_media_localized_id","_locale");
  CREATE UNIQUE INDEX "instructions_connect_detailed_locales_locale_parent_id_uniqu" ON "instructions_connect_detailed_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "instructions_activate_base_locales" ADD CONSTRAINT "instructions_activate_base_locales_inline_media_localized_id_media_id_fk" FOREIGN KEY ("inline_media_localized_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructions_activate_detailed_locales" ADD CONSTRAINT "instructions_activate_detailed_locales_inline_media_localized_id_media_id_fk" FOREIGN KEY ("inline_media_localized_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shared_steps_locales" ADD CONSTRAINT "shared_steps_locales_media_localized_id_media_id_fk" FOREIGN KEY ("media_localized_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "instructions_activate_base_inline_inline_media_localized_idx" ON "instructions_activate_base_locales" USING btree ("inline_media_localized_id","_locale");
  CREATE INDEX "instructions_activate_detailed_inline_inline_media_local_idx" ON "instructions_activate_detailed_locales" USING btree ("inline_media_localized_id","_locale");
  CREATE INDEX "shared_steps_media_localized_idx" ON "shared_steps_locales" USING btree ("media_localized_id","_locale");
  DROP TYPE "public"."enum_instructions_connect_sub_steps_base_source";
  DROP TYPE "public"."enum_instructions_connect_sub_steps_detailed_source";
  DROP TYPE "public"."enum_instructions_connect_sub_steps_key";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_instructions_connect_sub_steps_base_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_instructions_connect_sub_steps_detailed_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_instructions_connect_sub_steps_key" AS ENUM('rename', 'turn_on', 'roaming');
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
  
  ALTER TABLE "instructions_activate_manual_installation_base" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_activate_manual_installation_base_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_activate_manual_installation_detailed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_activate_manual_installation_detailed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_activate_sub_steps_base" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_activate_sub_steps_base_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_activate_sub_steps_detailed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_activate_sub_steps_detailed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_activate_sub_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_base" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_base_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_detailed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructions_connect_detailed_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "instructions_activate_manual_installation_base" CASCADE;
  DROP TABLE "instructions_activate_manual_installation_base_locales" CASCADE;
  DROP TABLE "instructions_activate_manual_installation_detailed" CASCADE;
  DROP TABLE "instructions_activate_manual_installation_detailed_locales" CASCADE;
  DROP TABLE "instructions_activate_sub_steps_base" CASCADE;
  DROP TABLE "instructions_activate_sub_steps_base_locales" CASCADE;
  DROP TABLE "instructions_activate_sub_steps_detailed" CASCADE;
  DROP TABLE "instructions_activate_sub_steps_detailed_locales" CASCADE;
  DROP TABLE "instructions_activate_sub_steps" CASCADE;
  DROP TABLE "instructions_connect_base" CASCADE;
  DROP TABLE "instructions_connect_base_locales" CASCADE;
  DROP TABLE "instructions_connect_detailed" CASCADE;
  DROP TABLE "instructions_connect_detailed_locales" CASCADE;
  ALTER TABLE "instructions_activate_base_locales" DROP CONSTRAINT "instructions_activate_base_locales_inline_media_localized_id_media_id_fk";
  
  ALTER TABLE "instructions_activate_detailed_locales" DROP CONSTRAINT "instructions_activate_detailed_locales_inline_media_localized_id_media_id_fk";
  
  ALTER TABLE "shared_steps_locales" DROP CONSTRAINT "shared_steps_locales_media_localized_id_media_id_fk";
  
  DROP INDEX "instructions_activate_base_inline_inline_media_localized_idx";
  DROP INDEX "instructions_activate_detailed_inline_inline_media_local_idx";
  DROP INDEX "shared_steps_media_localized_idx";
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
  ALTER TABLE "instructions_activate_base" DROP COLUMN "inline_media_translatable";
  ALTER TABLE "instructions_activate_base_locales" DROP COLUMN "inline_media_localized_id";
  ALTER TABLE "instructions_activate_detailed" DROP COLUMN "inline_media_translatable";
  ALTER TABLE "instructions_activate_detailed_locales" DROP COLUMN "inline_media_localized_id";
  ALTER TABLE "instructions" DROP COLUMN "platform";
  ALTER TABLE "shared_steps" DROP COLUMN "media_translatable";
  ALTER TABLE "shared_steps_locales" DROP COLUMN "media_localized_id";
  DROP TYPE "public"."enum_instructions_activate_manual_installation_base_source";
  DROP TYPE "public"."enum_instructions_activate_manual_installation_detailed_source";
  DROP TYPE "public"."enum_instructions_activate_sub_steps_base_source";
  DROP TYPE "public"."enum_instructions_activate_sub_steps_detailed_source";
  DROP TYPE "public"."enum_instructions_activate_sub_steps_key";
  DROP TYPE "public"."enum_instructions_connect_base_source";
  DROP TYPE "public"."enum_instructions_connect_detailed_source";
  DROP TYPE "public"."enum_instructions_platform";`)
}
