-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Client', 'Coach');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Female', 'Male', 'NotSpecified');

-- CreateEnum
CREATE TYPE "Skill" AS ENUM ('Amateur', 'Novice', 'Pro');

-- CreateEnum
CREATE TYPE "WorkoutType" AS ENUM ('Aerobics', 'Boxing', 'Crossfit', 'Pilates', 'Running', 'Streching', 'Yoga');

-- CreateEnum
CREATE TYPE "Time" AS ENUM ('TenToThirty', 'ThitryToFifty', 'FiftyToEighty', 'EightyToHundred');

-- CreateEnum
CREATE TYPE "Location" AS ENUM ('Pionerskaya', 'Petrogradskaya', 'Udelnaya', 'Zvezdnaya', 'Sportivnaya');

-- CreateEnum
CREATE TYPE "Payment" AS ENUM ('Visa', 'Mir', 'Umoney');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Considering', 'Accepted', 'Declined');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'NotSpecified',
    "skill" "Skill" NOT NULL,
    "location" "Location" NOT NULL,
    "birth" TIMESTAMP(3),
    "workout" "WorkoutType"[],
    "avatarUrl" TEXT NOT NULL,
    "bgUrl" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coach" (
    "userId" INTEGER NOT NULL,
    "certUrl" TEXT NOT NULL,
    "merits" TEXT NOT NULL,
    "hasPersonals" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Client" (
    "userId" INTEGER NOT NULL,
    "time" "Time" NOT NULL,
    "kcalTotal" INTEGER NOT NULL,
    "kcalDay" INTEGER NOT NULL,
    "isReady" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bgUrl" TEXT NOT NULL,
    "skill" "Skill" NOT NULL,
    "type" "WorkoutType" NOT NULL,
    "time" "Time" NOT NULL,
    "price" INTEGER NOT NULL,
    "kcal" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "isPromo" BOOLEAN NOT NULL DEFAULT false,
    "coachId" INTEGER NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "workoutId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "count" INTEGER NOT NULL,
    "payment" "Payment" NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Personal" (
    "id" SERIAL NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Considering',
    "clientId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Personal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Coach_userId_key" ON "Coach"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Client_userId_key" ON "Client"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Workout_coachId_key" ON "Workout"("coachId");

-- AddForeignKey
ALTER TABLE "Coach" ADD CONSTRAINT "Coach_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
