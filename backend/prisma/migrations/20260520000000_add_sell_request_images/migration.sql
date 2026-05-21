CREATE TABLE "SellRequestImage" (
    "id" TEXT NOT NULL,
    "sellRequestId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "originalFilename" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SellRequestImage_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "SellRequestImage" ADD CONSTRAINT "SellRequestImage_sellRequestId_fkey"
    FOREIGN KEY ("sellRequestId") REFERENCES "SellRequest"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
