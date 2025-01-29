/*
  Warnings:

  - You are about to drop the column `type` on the `Picture` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Picture` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `pictureId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profilename]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `picturename` to the `Picture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilename` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pictureId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropIndex
DROP INDEX "Picture_profileId_key";

-- DropIndex
DROP INDEX "Profile_pictureId_key";

-- DropIndex
DROP INDEX "Profile_userId_key";

-- AlterTable
ALTER TABLE "Picture" DROP COLUMN "type",
DROP COLUMN "url",
ADD COLUMN     "fileSize" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "picturename" TEXT NOT NULL,
ALTER COLUMN "profileId" SET DEFAULT 'some-default-profile-id';

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "createdAt",
DROP COLUMN "name",
DROP COLUMN "pictureId",
DROP COLUMN "userId",
DROP COLUMN "username",
ADD COLUMN     "profilename" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_profilename_key" ON "Profile"("profilename");

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
