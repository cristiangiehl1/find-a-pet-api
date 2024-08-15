/*
  Warnings:

  - Added the required column `uf` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "uf" TEXT NOT NULL;
