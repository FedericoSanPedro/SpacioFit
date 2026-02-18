/*
  Warnings:

  - You are about to drop the column `pago` on the `Asistencia` table. All the data in the column will be lost.
  - You are about to drop the `Pago` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pago" DROP CONSTRAINT "Pago_alumnoId_fkey";

-- AlterTable
ALTER TABLE "Asistencia" DROP COLUMN "pago";

-- DropTable
DROP TABLE "Pago";
