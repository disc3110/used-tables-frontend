ALTER TABLE "Product"
ALTER COLUMN "detailLayout" SET DEFAULT 'default';

UPDATE "Product"
SET "detailLayout" = 'default'
WHERE "detailLayout" = 'standard';

UPDATE "Product"
SET "detailLayout" = 'pool'
WHERE "categoryId" IN (
  SELECT "id" FROM "Category" WHERE "slug" = 'pool-tables'
)
AND "detailLayout" = 'default';

UPDATE "Product"
SET "detailLayout" = 'ping-pong'
WHERE "categoryId" IN (
  SELECT "id" FROM "Category" WHERE "slug" = 'ping-pong'
)
AND "detailLayout" = 'default';

UPDATE "Product"
SET "detailLayout" = 'foosball'
WHERE "categoryId" IN (
  SELECT "id" FROM "Category" WHERE "slug" = 'foosball'
)
AND "detailLayout" = 'default';
