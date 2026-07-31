import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "main_page_headlines" ADD COLUMN "cta_title" varchar;
  ALTER TABLE "main_page_headlines" ADD COLUMN "cta_description" varchar;
  ALTER TABLE "main_page_headlines" ADD COLUMN "cta_book_label" varchar;
  ALTER TABLE "main_page_headlines" ADD COLUMN "cta_call_label" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "main_page_headlines" DROP COLUMN "cta_title";
  ALTER TABLE "main_page_headlines" DROP COLUMN "cta_description";
  ALTER TABLE "main_page_headlines" DROP COLUMN "cta_book_label";
  ALTER TABLE "main_page_headlines" DROP COLUMN "cta_call_label";`)
}
