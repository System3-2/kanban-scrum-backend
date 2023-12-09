/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `issues` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `projects` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "issues_id_key" ON "issues"("id");

-- CreateIndex
CREATE UNIQUE INDEX "projects_id_key" ON "projects"("id");
