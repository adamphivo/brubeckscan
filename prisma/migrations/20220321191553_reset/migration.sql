/*
  Warnings:

  - The primary key for the `Node` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `color` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `nodeListId` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the `NodeList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_nodeListId_fkey";

-- DropForeignKey
ALTER TABLE "NodeList" DROP CONSTRAINT "NodeList_userAddress_fkey";

-- AlterTable
ALTER TABLE "Node" DROP CONSTRAINT "Node_pkey",
DROP COLUMN "color",
DROP COLUMN "name",
DROP COLUMN "nodeListId",
ADD COLUMN     "userAddress" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Node_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Node_id_seq";

-- DropTable
DROP TABLE "NodeList";

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_userAddress_fkey" FOREIGN KEY ("userAddress") REFERENCES "User"("address") ON DELETE SET NULL ON UPDATE CASCADE;
