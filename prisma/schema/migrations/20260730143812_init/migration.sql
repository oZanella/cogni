-- CreateEnum
CREATE TYPE "emocao" AS ENUM ('ANSIEDADE', 'TRISTEZA', 'RAIVA', 'MEDO', 'VERGONHA', 'CULPA', 'FRUSTRACAO', 'ALEGRIA', 'OUTRO');

-- CreateTable
CREATE TABLE "registroPensamento" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "situacao" TEXT NOT NULL,
    "pensamento" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "registroPensamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registroPensamentoEmocao" (
    "id" SERIAL NOT NULL,
    "registroPensamentoId" INTEGER NOT NULL,
    "emocao" "emocao" NOT NULL,
    "intensidade" SMALLINT NOT NULL,

    CONSTRAINT "registroPensamentoEmocao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(80) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_registro_pensamento_usuario_id_usuario" ON "registroPensamento"("usuarioId");

-- CreateIndex
CREATE INDEX "idx_registro_pensamento_emocao_registro_pensamento_id" ON "registroPensamentoEmocao"("registroPensamentoId");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "registroPensamento" ADD CONSTRAINT "registroPensamento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registroPensamentoEmocao" ADD CONSTRAINT "registroPensamentoEmocao_registroPensamentoId_fkey" FOREIGN KEY ("registroPensamentoId") REFERENCES "registroPensamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;
