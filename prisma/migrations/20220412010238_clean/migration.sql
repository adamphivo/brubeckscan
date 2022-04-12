/*
  Warnings:

  - You are about to drop the `AppStat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WatchlistStat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WatchlistStat" DROP CONSTRAINT "WatchlistStat_userAddress_fkey";

-- DropTable
DROP TABLE "AppStat";

-- DropTable
DROP TABLE "WatchlistStat";
