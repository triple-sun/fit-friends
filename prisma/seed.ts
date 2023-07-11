import { Gender, Location, PrismaClient, Role, Skill, Time, WorkoutType } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';
import { create } from 'domain';

const prisma = new PrismaClient();

const getSeedUserPassHash = async () => {
  const pass = process.env['SEED_USER_PASS']
  const salt = await genSalt(10);

  if (!pass) {
    throw new Error('Seed user password is undefined')
  }

  return await hash(pass, salt);
}

async function fillDb() {
  const seedUserPassHash = await getSeedUserPassHash()

  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Андрей',
      email: 'andrew@mail.local',
      about: 'Люблю протеин',
      gender: Gender.Male,
      role: Role.Coach,
      skill: Skill.Pro,
      location: Location.Petrogradskaya,
      birth: new Date(),
      passwordHash: seedUserPassHash,
      workoutTypes: [WorkoutType.Boxing, WorkoutType.Pilates],
      avatarUrl: '/markup/img/content/avatars/coaches/photo-1.png',
      bgUrl: '/markup/img/content/user-card-coach/training-1.jpg',
      coachInfo: {
        connectOrCreate: {
          where: {
            userId: 1
          },
          create: {
            certUrl: '/markup/img/content/certificates-and-diplomas/certificate-1.jpg',
            merits: "Двухкратный чемпион Саратова по гандболу",
          }
        }
      }
    },
  });

    await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Юлия',
      email: 'yulia@mail.local',
      about: '',
      gender: Gender.Female,
      role: Role.Client,
      skill: Skill.Amateur,
      location: Location.Udelnaya,
      birth: new Date(),
      passwordHash: seedUserPassHash,
      avatarUrl: '/markup/img/content/avatars/users/photo-5.png',
      bgUrl: '/markup/img/content/user-card-coach/training-3.jpg',
      workoutTypes: [WorkoutType.Aerobics],
      clientInfo: {
        connectOrCreate: {
          where: { userId: 2 },
          create: {
            kcalDay: 1000,
            kcalTotal: 3000,
            time: Time.EightyToHundred,

          }
        }
      }
    },
  });

  console.info('🤘️ Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
