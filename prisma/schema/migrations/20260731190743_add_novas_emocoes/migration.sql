-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "emocao" ADD VALUE 'CANSACO';
ALTER TYPE "emocao" ADD VALUE 'EXAUSTAO';
ALTER TYPE "emocao" ADD VALUE 'SOLIDAO';
ALTER TYPE "emocao" ADD VALUE 'CONFUSAO';
ALTER TYPE "emocao" ADD VALUE 'ESPERANCA';
ALTER TYPE "emocao" ADD VALUE 'CALMA';
