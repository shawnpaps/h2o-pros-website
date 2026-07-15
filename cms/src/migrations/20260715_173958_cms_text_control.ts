import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_main_page_headlines_page" AS ENUM('our-services', 'about-us', 'reviews', 'contact', 'gallery');
  CREATE TABLE "main_page_headlines" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page" "enum_main_page_headlines_page" NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "offers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"detail" varchar NOT NULL,
  	"fine" varchar,
  	"published" boolean DEFAULT true,
  	"sort_order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_home_hero_ticker" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "main_page_headlines_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "offers_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "home_hero_headline" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "home_hero_left_line1" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "home_hero_left_line2" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "home_hero_right_line1" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "home_hero_right_line2" varchar;
  ALTER TABLE "site_settings_home_hero_ticker" ADD CONSTRAINT "site_settings_home_hero_ticker_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "main_page_headlines_page_idx" ON "main_page_headlines" USING btree ("page");
  CREATE INDEX "main_page_headlines_updated_at_idx" ON "main_page_headlines" USING btree ("updated_at");
  CREATE INDEX "main_page_headlines_created_at_idx" ON "main_page_headlines" USING btree ("created_at");
  CREATE INDEX "offers_updated_at_idx" ON "offers" USING btree ("updated_at");
  CREATE INDEX "offers_created_at_idx" ON "offers" USING btree ("created_at");
  CREATE INDEX "site_settings_home_hero_ticker_order_idx" ON "site_settings_home_hero_ticker" USING btree ("_order");
  CREATE INDEX "site_settings_home_hero_ticker_parent_id_idx" ON "site_settings_home_hero_ticker" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_main_page_headlines_fk" FOREIGN KEY ("main_page_headlines_id") REFERENCES "public"."main_page_headlines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_offers_fk" FOREIGN KEY ("offers_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_main_page_headlines_id_idx" ON "payload_locked_documents_rels" USING btree ("main_page_headlines_id");
  CREATE INDEX "payload_locked_documents_rels_offers_id_idx" ON "payload_locked_documents_rels" USING btree ("offers_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "main_page_headlines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "offers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_home_hero_ticker" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "main_page_headlines" CASCADE;
  DROP TABLE "offers" CASCADE;
  DROP TABLE "site_settings_home_hero_ticker" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_main_page_headlines_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_offers_fk";
  
  DROP INDEX "payload_locked_documents_rels_main_page_headlines_id_idx";
  DROP INDEX "payload_locked_documents_rels_offers_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "main_page_headlines_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "offers_id";
  ALTER TABLE "site_settings" DROP COLUMN "home_hero_headline";
  ALTER TABLE "site_settings" DROP COLUMN "home_hero_left_line1";
  ALTER TABLE "site_settings" DROP COLUMN "home_hero_left_line2";
  ALTER TABLE "site_settings" DROP COLUMN "home_hero_right_line1";
  ALTER TABLE "site_settings" DROP COLUMN "home_hero_right_line2";
  DROP TYPE "public"."enum_main_page_headlines_page";`)
}
