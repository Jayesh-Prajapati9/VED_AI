/*
  Warnings:

  - Added the required column `uploadedURL` to the `audioFiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadedURL` to the `imagesFiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadedURL` to the `pdfFiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "audioFiles" ADD COLUMN     "uploadedURL" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "imagesFiles" ADD COLUMN     "uploadedURL" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pdfFiles" ADD COLUMN     "uploadedURL" TEXT NOT NULL;
