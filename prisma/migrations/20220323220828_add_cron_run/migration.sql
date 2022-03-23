-- CreateTable
CREATE TABLE "CronRun" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "runTimeInSeconds" DOUBLE PRECISION NOT NULL,
    "finalStatus" INTEGER NOT NULL,

    CONSTRAINT "CronRun_pkey" PRIMARY KEY ("id")
);
