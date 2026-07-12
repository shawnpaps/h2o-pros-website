import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ADD COLUMN "home_hero_card_left_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "home_hero_card_center_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "home_hero_card_right_id" integer;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_home_hero_card_left_id_media_id_fk" FOREIGN KEY ("home_hero_card_left_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_home_hero_card_center_id_media_id_fk" FOREIGN KEY ("home_hero_card_center_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_home_hero_card_right_id_media_id_fk" FOREIGN KEY ("home_hero_card_right_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_home_hero_card_left_idx" ON "site_settings" USING btree ("home_hero_card_left_id");
  CREATE INDEX "site_settings_home_hero_card_center_idx" ON "site_settings" USING btree ("home_hero_card_center_id");
  CREATE INDEX "site_settings_home_hero_card_right_idx" ON "site_settings" USING btree ("home_hero_card_right_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_home_hero_card_left_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_home_hero_card_center_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_home_hero_card_right_id_media_id_fk";
  
  DROP INDEX "site_settings_home_hero_card_left_idx";
  DROP INDEX "site_settings_home_hero_card_center_idx";
  DROP INDEX "site_settings_home_hero_card_right_idx";
  ALTER TABLE "site_settings" DROP COLUMN "home_hero_card_left_id";
  ALTER TABLE "site_settings" DROP COLUMN "home_hero_card_center_id";
  ALTER TABLE "site_settings" DROP COLUMN "home_hero_card_right_id";`)
}
