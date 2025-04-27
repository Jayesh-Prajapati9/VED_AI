/*
  Warnings:

  - You are about to drop the column `fileId` on the `chatHistory` table. All the data in the column will be lost.
  - You are about to drop the column `fileId` on the `extractedText` table. All the data in the column will be lost.
  - You are about to drop the `files` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "chatHistory" DROP CONSTRAINT "chatHistory_fileId_fkey";

-- DropForeignKey
ALTER TABLE "extractedText" DROP CONSTRAINT "extractedText_fileId_fkey";

-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_userId_fkey";

-- AlterTable
ALTER TABLE "chatHistory" DROP COLUMN "fileId",
ADD COLUMN     "audioFileId" TEXT,
ADD COLUMN     "imageFileId" TEXT,
ADD COLUMN     "pdfFileId" TEXT;

-- AlterTable
ALTER TABLE "extractedText" DROP COLUMN "fileId",
ADD COLUMN     "audioFileId" TEXT,
ADD COLUMN     "imageFileId" TEXT,
ADD COLUMN     "pdfFileId" TEXT;

-- DropTable
DROP TABLE "files";

-- CreateTable
CREATE TABLE "audioFiles" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL DEFAULT 'AUDIO',
    "uploaded_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "audioFiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imagesFiles" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL DEFAULT 'IMAGES',
    "uploaded_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "imagesFiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pdfFiles" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL DEFAULT 'PDF',
    "uploaded_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "pdfFiles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "audioFiles" ADD CONSTRAINT "audioFiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imagesFiles" ADD CONSTRAINT "imagesFiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pdfFiles" ADD CONSTRAINT "pdfFiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extractedText" ADD CONSTRAINT "extractedText_audioFileId_fkey" FOREIGN KEY ("audioFileId") REFERENCES "audioFiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extractedText" ADD CONSTRAINT "extractedText_imageFileId_fkey" FOREIGN KEY ("imageFileId") REFERENCES "imagesFiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extractedText" ADD CONSTRAINT "extractedText_pdfFileId_fkey" FOREIGN KEY ("pdfFileId") REFERENCES "pdfFiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatHistory" ADD CONSTRAINT "chatHistory_audioFileId_fkey" FOREIGN KEY ("audioFileId") REFERENCES "audioFiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatHistory" ADD CONSTRAINT "chatHistory_imageFileId_fkey" FOREIGN KEY ("imageFileId") REFERENCES "imagesFiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatHistory" ADD CONSTRAINT "chatHistory_pdfFileId_fkey" FOREIGN KEY ("pdfFileId") REFERENCES "pdfFiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
