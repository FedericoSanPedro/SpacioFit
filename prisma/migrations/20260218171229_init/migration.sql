/*
  Warnings:

  - You are about to drop the column `horasTotales` on the `Alumno` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[codigoUnico]` on the table `Alumno` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codigoUnico` to the `Alumno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alumno" DROP COLUMN "horasTotales",
ADD COLUMN     "codigoUnico" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Asistencia" ADD COLUMN     "horas" DOUBLE PRECISION NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "Pago" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "monto" DOUBLE PRECISION NOT NULL,
    "descripcion" TEXT,
    "alumnoId" INTEGER NOT NULL,

    CONSTRAINT "Pago_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertificacionAlumno" (
    "id" SERIAL NOT NULL,
    "alumnoId" INTEGER NOT NULL,
    "nivelId" INTEGER NOT NULL,
    "otorgado" BOOLEAN NOT NULL DEFAULT false,
    "fechaLogro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaEntrega" TIMESTAMP(3),

    CONSTRAINT "CertificacionAlumno_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CertificacionAlumno_alumnoId_nivelId_key" ON "CertificacionAlumno"("alumnoId", "nivelId");

-- CreateIndex
CREATE UNIQUE INDEX "Alumno_codigoUnico_key" ON "Alumno"("codigoUnico");

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificacionAlumno" ADD CONSTRAINT "CertificacionAlumno_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificacionAlumno" ADD CONSTRAINT "CertificacionAlumno_nivelId_fkey" FOREIGN KEY ("nivelId") REFERENCES "Nivel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
