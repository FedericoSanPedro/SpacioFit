/*
  Warnings:

  - You are about to drop the column `codigoUnico` on the `Alumno` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Alumno_codigoUnico_key";

-- AlterTable
ALTER TABLE "Alumno" DROP COLUMN "codigoUnico";
