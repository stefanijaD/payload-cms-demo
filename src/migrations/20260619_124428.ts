import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_act_apn_base_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TYPE "public"."enum_act_apn_detail_source" AS ENUM('inline', 'sharedStep', 'sharedStepGroup');
  CREATE TABLE "act_apn_base" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_act_apn_base_source" DEFAULT 'inline',
  	"inline_media_translatable" boolean DEFAULT false,
  	"inline_media_id" integer,
  	"shared_step_id" integer,
  	"shared_step_group_id" integer
  );
  
  CREATE TABLE "act_apn_base_locales" (
  	"inline_name" varchar,
  	"inline_description" varchar,
  	"inline_media_localized_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "act_apn_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_act_apn_detail_source" DEFAULT 'inline',
  	"inline_media_translatable" boolean DEFAULT false,
  	"inline_media_id" integer,
  	"shared_step_id" integer,
  	"shared_step_group_id" integer
  );
  
  CREATE TABLE "act_apn_detail_locales" (
  	"inline_name" varchar,
  	"inline_description" varchar,
  	"inline_media_localized_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "act_apn_base" ADD CONSTRAINT "act_apn_base_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_apn_base" ADD CONSTRAINT "act_apn_base_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_apn_base" ADD CONSTRAINT "act_apn_base_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_apn_base" ADD CONSTRAINT "act_apn_base_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "act_apn_base_locales" ADD CONSTRAINT "act_apn_base_locales_inline_media_localized_id_media_id_fk" FOREIGN KEY ("inline_media_localized_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_apn_base_locales" ADD CONSTRAINT "act_apn_base_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."act_apn_base"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "act_apn_detail" ADD CONSTRAINT "act_apn_detail_inline_media_id_media_id_fk" FOREIGN KEY ("inline_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_apn_detail" ADD CONSTRAINT "act_apn_detail_shared_step_id_shared_steps_id_fk" FOREIGN KEY ("shared_step_id") REFERENCES "public"."shared_steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_apn_detail" ADD CONSTRAINT "act_apn_detail_shared_step_group_id_shared_step_groups_id_fk" FOREIGN KEY ("shared_step_group_id") REFERENCES "public"."shared_step_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_apn_detail" ADD CONSTRAINT "act_apn_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "act_apn_detail_locales" ADD CONSTRAINT "act_apn_detail_locales_inline_media_localized_id_media_id_fk" FOREIGN KEY ("inline_media_localized_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_apn_detail_locales" ADD CONSTRAINT "act_apn_detail_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."act_apn_detail"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "act_apn_base_order_idx" ON "act_apn_base" USING btree ("_order");
  CREATE INDEX "act_apn_base_parent_id_idx" ON "act_apn_base" USING btree ("_parent_id");
  CREATE INDEX "act_apn_base_inline_inline_media_idx" ON "act_apn_base" USING btree ("inline_media_id");
  CREATE INDEX "act_apn_base_shared_step_idx" ON "act_apn_base" USING btree ("shared_step_id");
  CREATE INDEX "act_apn_base_shared_step_group_idx" ON "act_apn_base" USING btree ("shared_step_group_id");
  CREATE INDEX "act_apn_base_inline_inline_media_localized_idx" ON "act_apn_base_locales" USING btree ("inline_media_localized_id","_locale");
  CREATE UNIQUE INDEX "act_apn_base_locales_locale_parent_id_unique" ON "act_apn_base_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "act_apn_detail_order_idx" ON "act_apn_detail" USING btree ("_order");
  CREATE INDEX "act_apn_detail_parent_id_idx" ON "act_apn_detail" USING btree ("_parent_id");
  CREATE INDEX "act_apn_detail_inline_inline_media_idx" ON "act_apn_detail" USING btree ("inline_media_id");
  CREATE INDEX "act_apn_detail_shared_step_idx" ON "act_apn_detail" USING btree ("shared_step_id");
  CREATE INDEX "act_apn_detail_shared_step_group_idx" ON "act_apn_detail" USING btree ("shared_step_group_id");
  CREATE INDEX "act_apn_detail_inline_inline_media_localized_idx" ON "act_apn_detail_locales" USING btree ("inline_media_localized_id","_locale");
  CREATE UNIQUE INDEX "act_apn_detail_locales_locale_parent_id_unique" ON "act_apn_detail_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "act_apn_base" CASCADE;
  DROP TABLE "act_apn_base_locales" CASCADE;
  DROP TABLE "act_apn_detail" CASCADE;
  DROP TABLE "act_apn_detail_locales" CASCADE;
  DROP TYPE "public"."enum_act_apn_base_source";
  DROP TYPE "public"."enum_act_apn_detail_source";`)
}
