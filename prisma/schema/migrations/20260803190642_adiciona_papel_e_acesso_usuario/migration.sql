-- CreateEnum
CREATE TYPE "papel_usuario" AS ENUM ('ADMIN', 'PACIENTE');

-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "acessoExpiraEm" TIMESTAMP(3),
ADD COLUMN     "papel" "papel_usuario" NOT NULL DEFAULT 'PACIENTE';
