-- CreateTable
CREATE TABLE "WatchlistStat" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userAddress" TEXT,
    "totalNodes" INTEGER NOT NULL,
    "totalDataStaked" DOUBLE PRECISION NOT NULL,
    "totalRewardsInData" DOUBLE PRECISION NOT NULL,
    "totalClaimCount" INTEGER NOT NULL,

    CONSTRAINT "WatchlistStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppStat" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalUsers" INTEGER NOT NULL,
    "totalNodesWatched" INTEGER NOT NULL,
    "totalDataStaked" DOUBLE PRECISION NOT NULL,
    "totalRewardsInData" DOUBLE PRECISION NOT NULL,
    "totalClaimCount" INTEGER NOT NULL,

    CONSTRAINT "AppStat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WatchlistStat" ADD CONSTRAINT "WatchlistStat_userAddress_fkey" FOREIGN KEY ("userAddress") REFERENCES "User"("address") ON DELETE SET NULL ON UPDATE CASCADE;
