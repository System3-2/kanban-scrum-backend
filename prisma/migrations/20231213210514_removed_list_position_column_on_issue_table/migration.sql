/*
  Warnings:

  - You are about to drop the column `listPosition` on the `issues` table. All the data in the column will be lost.
  - You are about to drop the column `userIds` on the `issues` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "issues" DROP COLUMN "listPosition",
DROP COLUMN "userIds",
ALTER COLUMN "reporterId" DROP NOT NULL;
