ALTER TABLE "Product"
ALTER COLUMN "quoteOnly" SET DEFAULT false;

UPDATE "Product"
SET "quoteOnly" = false;
