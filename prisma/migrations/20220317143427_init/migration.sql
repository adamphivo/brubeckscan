-- CreateTable
CREATE TABLE "Account" (
    "address" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("address")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_address_key" ON "Account"("address");
