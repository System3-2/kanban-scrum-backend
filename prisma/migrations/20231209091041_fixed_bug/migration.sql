/*
  Warnings:

  - Added the required column `category` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "projects_url_key";

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "category" "ProjectCategory" NOT NULL,
ALTER COLUMN "url" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "projectId" INTEGER,
ALTER COLUMN "avatarUrl" SET DATA TYPE VARCHAR(2000);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "issueId" INTEGER NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "issues" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" "IssueType" NOT NULL,
    "status" "IssueStatus" NOT NULL,
    "priority" "IssuePriority" NOT NULL,
    "listPosition" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "descriptionText" TEXT,
    "estimate" INTEGER,
    "timeSpent" INTEGER,
    "timeRemaining" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "reporterId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "userIds" INTEGER[],

    CONSTRAINT "issues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_IssueToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "comments_id_key" ON "comments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "issues_id_key" ON "issues"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_IssueToUser_AB_unique" ON "_IssueToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_IssueToUser_B_index" ON "_IssueToUser"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "issues"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IssueToUser" ADD CONSTRAINT "_IssueToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "issues"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IssueToUser" ADD CONSTRAINT "_IssueToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
