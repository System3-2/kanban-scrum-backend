/*
  Warnings:

  - The values [highest,high,medium,low,lowest] on the enum `IssuePriority` will be removed. If these variants are still used in the database, this will fail.
  - The values [backlog,selected,inprogress,done] on the enum `IssueStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [bug,task,feature] on the enum `IssueType` will be removed. If these variants are still used in the database, this will fail.
  - The values [software,marketing,business] on the enum `ProjectCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "IssuePriority_new" AS ENUM ('HIGHEST', 'HIGH', 'MEDIUM', 'LOW', 'LOWEST');
ALTER TABLE "issues" ALTER COLUMN "priority" TYPE "IssuePriority_new" USING ("priority"::text::"IssuePriority_new");
ALTER TYPE "IssuePriority" RENAME TO "IssuePriority_old";
ALTER TYPE "IssuePriority_new" RENAME TO "IssuePriority";
DROP TYPE "IssuePriority_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "IssueStatus_new" AS ENUM ('BACKLOG', 'SELECTED', 'INPROGRESS', 'DONE');
ALTER TABLE "issues" ALTER COLUMN "status" TYPE "IssueStatus_new" USING ("status"::text::"IssueStatus_new");
ALTER TYPE "IssueStatus" RENAME TO "IssueStatus_old";
ALTER TYPE "IssueStatus_new" RENAME TO "IssueStatus";
DROP TYPE "IssueStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "IssueType_new" AS ENUM ('BUG', 'TASK', 'FEATURE');
ALTER TABLE "issues" ALTER COLUMN "type" TYPE "IssueType_new" USING ("type"::text::"IssueType_new");
ALTER TYPE "IssueType" RENAME TO "IssueType_old";
ALTER TYPE "IssueType_new" RENAME TO "IssueType";
DROP TYPE "IssueType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ProjectCategory_new" AS ENUM ('SOFTWARE', 'MARKETING', 'BUSINESS');
ALTER TABLE "projects" ALTER COLUMN "category" TYPE "ProjectCategory_new" USING ("category"::text::"ProjectCategory_new");
ALTER TYPE "ProjectCategory" RENAME TO "ProjectCategory_old";
ALTER TYPE "ProjectCategory_new" RENAME TO "ProjectCategory";
DROP TYPE "ProjectCategory_old";
COMMIT;
