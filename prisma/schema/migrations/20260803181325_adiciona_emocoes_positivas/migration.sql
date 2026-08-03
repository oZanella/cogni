-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "emocao" ADD VALUE 'GRATIDAO';
ALTER TYPE "emocao" ADD VALUE 'EMPOLGACAO';
ALTER TYPE "emocao" ADD VALUE 'ORGULHO';
ALTER TYPE "emocao" ADD VALUE 'SATISFACAO';
ALTER TYPE "emocao" ADD VALUE 'ALIVIO';
ALTER TYPE "emocao" ADD VALUE 'AMOR';
ALTER TYPE "emocao" ADD VALUE 'CONFIANCA';
ALTER TYPE "emocao" ADD VALUE 'ENTUSIASMO';
