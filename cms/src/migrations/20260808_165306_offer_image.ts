import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

// The main_page_headlines cta_* columns the generator also emitted here already
// exist in the database (20260731_133000_page_cta_band shipped without a schema
// snapshot, so the diff baseline was stale) and have been dropped from this
// migration. The snapshot alongside this file records them, so later diffs are
// clean again.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "offers" ADD COLUMN "image_id" integer;
  ALTER TABLE "offers" ADD CONSTRAINT "offers_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "offers_image_idx" ON "offers" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "offers" DROP CONSTRAINT "offers_image_id_media_id_fk";

  DROP INDEX "offers_image_idx";
  ALTER TABLE "offers" DROP COLUMN "image_id";`)
}
