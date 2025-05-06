-- CreateTable
CREATE TABLE "Pen" (
    "id" SERIAL NOT NULL,
    "html" TEXT NOT NULL,
    "css" TEXT NOT NULL,
    "js" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pen_pkey" PRIMARY KEY ("id")
);
