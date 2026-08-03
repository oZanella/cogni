-- AlterTable
ALTER TABLE "usuario" ADD COLUMN "nomeUsuario" VARCHAR(30);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_nomeUsuario_key" ON "usuario"("nomeUsuario");
