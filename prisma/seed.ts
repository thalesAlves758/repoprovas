import pkg from '@prisma/client';

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function seedTerms() {
  const promises = [
    prisma.term.upsert({
      create: { number: 1 },
      update: {},
      where: { number: 1 },
    }),
    prisma.term.upsert({
      create: { number: 2 },
      update: {},
      where: { number: 2 },
    }),
    prisma.term.upsert({
      create: { number: 3 },
      update: {},
      where: { number: 3 },
    }),
    prisma.term.upsert({
      create: { number: 4 },
      update: {},
      where: { number: 4 },
    }),
    prisma.term.upsert({
      create: { number: 5 },
      update: {},
      where: { number: 5 },
    }),
    prisma.term.upsert({
      create: { number: 6 },
      update: {},
      where: { number: 6 },
    }),
  ];

  await Promise.all(promises);
}

async function seedCategories() {
  const promises = [
    prisma.category.upsert({
      create: { name: 'Projeto' },
      update: {},
      where: { name: 'Projeto' },
    }),
    prisma.category.upsert({
      create: { name: 'Prática' },
      update: {},
      where: { name: 'Prática' },
    }),
    prisma.category.upsert({
      create: { name: 'Recuperação' },
      update: {},
      where: { name: 'Recuperação' },
    }),
  ];

  await Promise.all(promises);
}

async function seedTeachers() {
  const promises = [
    prisma.teacher.upsert({
      create: { name: 'Diego Pinho' },
      update: {},
      where: { name: 'Diego Pinho' },
    }),
    prisma.teacher.upsert({
      create: { name: 'Bruna Hamori' },
      update: {},
      where: { name: 'Bruna Hamori' },
    }),
  ];

  await Promise.all(promises);
}

async function seedDisciplines() {
  const promises = [
    prisma.discipline.upsert({
      create: { name: 'HTML e CSS', termId: 1 },
      update: {},
      where: { name: 'HTML e CSS' },
    }),
    prisma.discipline.upsert({
      create: { name: 'JavaScript', termId: 2 },
      update: {},
      where: { name: 'JavaScript' },
    }),
    prisma.discipline.upsert({
      create: { name: 'React', termId: 3 },
      update: {},
      where: { name: 'React' },
    }),
    prisma.discipline.upsert({
      create: { name: 'Humildade', termId: 1 },
      update: {},
      where: { name: 'Humildade' },
    }),
    prisma.discipline.upsert({
      create: { name: 'Planejamento', termId: 2 },
      update: {},
      where: { name: 'Planejamento' },
    }),
    prisma.discipline.upsert({
      create: { name: 'Autoconfiança', termId: 3 },
      update: {},
      where: { name: 'Autoconfiança' },
    }),
  ];

  await Promise.all(promises);
}

async function seedTeachersDisciplines() {
  await prisma.teacherDiscipline.upsert({
    create: { teacherId: 1, disciplineId: 1 },
    update: {},
    where: { id: 1 },
  });
  await prisma.teacherDiscipline.upsert({
    create: { teacherId: 1, disciplineId: 2 },
    update: {},
    where: { id: 2 },
  });
  await prisma.teacherDiscipline.upsert({
    create: { teacherId: 1, disciplineId: 3 },
    update: {},
    where: { id: 3 },
  });
  await prisma.teacherDiscipline.upsert({
    create: { teacherId: 2, disciplineId: 4 },
    update: {},
    where: { id: 4 },
  });
  await prisma.teacherDiscipline.upsert({
    create: { teacherId: 2, disciplineId: 5 },
    update: {},
    where: { id: 5 },
  });
  await prisma.teacherDiscipline.upsert({
    create: { teacherId: 2, disciplineId: 6 },
    update: {},
    where: { id: 6 },
  });
}

async function main() {
  await Promise.all([seedTerms(), seedCategories(), seedTeachers()]);

  await seedDisciplines();
  await seedTeachersDisciplines();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1); /* eslint-disable-line */
  });
