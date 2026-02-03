-- AlterTable
ALTER TABLE "Consultation" ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "birthPlace" TEXT,
ADD COLUMN     "birthTime" TEXT,
ADD COLUMN     "consultationPurpose" TEXT;
