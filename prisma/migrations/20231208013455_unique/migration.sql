/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `projects` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "projects_id_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "projects_id_key" ON "projects"("id");
