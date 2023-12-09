/*
  Warnings:

  - You are about to drop the `_IssueToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `issues` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_IssueToUser" DROP CONSTRAINT "_IssueToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_IssueToUser" DROP CONSTRAINT "_IssueToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_issueId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "issues" DROP CONSTRAINT "issues_projectId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_projectId_fkey";

-- DropTable
DROP TABLE "_IssueToUser";

-- DropTable
DROP TABLE "comments";

-- DropTable
DROP TABLE "issues";

-- DropTable
DROP TABLE "projects";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "avatarUrl" VARCHAR(200),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
