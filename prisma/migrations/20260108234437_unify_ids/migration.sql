/*
  Warnings:

  - The primary key for the `Alumno` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Alumno` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Asistencia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Asistencia` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Nivel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Nivel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Pago` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Pago` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Turno` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Turno` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `turnoId` on the `Alumno` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `alumnoId` on the `Asistencia` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `turnoId` on the `Asistencia` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `alumnoId` on the `Pago` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Alumno" DROP CONSTRAINT "Alumno_turnoId_fkey";

-- DropForeignKey
ALTER TABLE "Asistencia" DROP CONSTRAINT "Asistencia_alumnoId_fkey";

-- DropForeignKey
ALTER TABLE "Asistencia" DROP CONSTRAINT "Asistencia_turnoId_fkey";

-- DropForeignKey
ALTER TABLE "Pago" DROP CONSTRAINT "Pago_alumnoId_fkey";

-- AlterTable
ALTER TABLE "Alumno" DROP CONSTRAINT "Alumno_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "turnoId",
ADD COLUMN     "turnoId" INTEGER NOT NULL,
ADD CONSTRAINT "Alumno_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Asistencia" DROP CONSTRAINT "Asistencia_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "alumnoId",
ADD COLUMN     "alumnoId" INTEGER NOT NULL,
DROP COLUMN "turnoId",
ADD COLUMN     "turnoId" INTEGER NOT NULL,
ADD CONSTRAINT "Asistencia_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Nivel" DROP CONSTRAINT "Nivel_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Nivel_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Pago" DROP CONSTRAINT "Pago_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "alumnoId",
ADD COLUMN     "alumnoId" INTEGER NOT NULL,
ADD CONSTRAINT "Pago_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Turno" DROP CONSTRAINT "Turno_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Turno_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Asistencia_fecha_alumnoId_turnoId_key" ON "Asistencia"("fecha", "alumnoId", "turnoId");

-- AddForeignKey
ALTER TABLE "Alumno" ADD CONSTRAINT "Alumno_turnoId_fkey" FOREIGN KEY ("turnoId") REFERENCES "Turno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_turnoId_fkey" FOREIGN KEY ("turnoId") REFERENCES "Turno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
