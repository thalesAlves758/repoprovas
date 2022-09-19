import { Test } from '@prisma/client';
import { prisma } from '../config/database';
import {
  TestGroupedByDisciplineData,
  TestGroupedByTeacherData,
  TestInsertData,
} from '../types/test.types';

export async function insert(data: TestInsertData): Promise<Test> {
  return prisma.test.create({ data });
}

export async function findGroupedByDiscipline(): Promise<
  TestGroupedByDisciplineData[]
> {
  return prisma.$queryRaw`
    SELECT 
      "terms".number AS "term",
      ARRAY(
        SELECT row_to_json("disciplineRow")
        FROM (
          SELECT
            "disciplines".*,
            ARRAY (
              SELECT row_to_json("categoryRow")
              FROM (
                SELECT 
                  "categories".*,
                  ARRAY (
                    SELECT row_to_json("testRow")
                    FROM (
                      SELECT
                        "tests".*,
                        "teachers".name AS "teacher"
                      FROM "tests"
                      JOIN "teachersDisciplines" ON "teachersDisciplines".id = "tests"."teacherDisciplineId"
                      JOIN "teachers" ON "teachers".id = "teachersDisciplines"."teacherId"
                      WHERE "tests"."categoryId" = "categories".id
                    ) "testRow"
                  ) AS "tests"
                FROM categories
                JOIN "tests" ON "tests"."categoryId" = "categories".id
                JOIN "teachersDisciplines" ON "tests"."teacherDisciplineId" = "teachersDisciplines".id
                WHERE "disciplines".id = "teachersDisciplines"."disciplineId"
              ) "categoryRow"
            ) AS "categories"
          FROM "disciplines"
          WHERE "disciplines"."termId" = "terms".id
        ) "disciplineRow"
      ) AS "disciplines"
    FROM "terms"
    LEFT JOIN "disciplines" ON "disciplines"."termId" = "terms".id
    GROUP BY "terms".id
    ORDER BY "terms".number
  `;
}

export async function findGroupedByTeacher(): Promise<
  TestGroupedByTeacherData[]
> {
  return prisma.$queryRaw`
    SELECT 
      "outerTeachers".name AS "teacher",
      ARRAY (
        SELECT row_to_json("categoryRow")
        FROM (
          SELECT
            "categories".*,
            ARRAY (
              SELECT row_to_json("testRow")
              FROM (
                SELECT 
                  "tests".id,
                  "tests".name,
                  "tests"."pdfUrl",
                  "tests"."categoryId",
                  "disciplines".name AS "discipline"
                FROM "tests"
                JOIN "teachersDisciplines" ON "teachersDisciplines".id = "tests"."teacherDisciplineId"
                JOIN "teachers" ON "teachers".id = "teachersDisciplines"."teacherId"
                JOIN "disciplines" ON "disciplines".id = "teachersDisciplines"."disciplineId"
                WHERE "teachers".id = "outerTeachers".id AND "tests"."categoryId" = "categories".id
              ) "testRow"
            ) AS "tests"
          FROM "categories"
          JOIN "tests" ON "tests"."categoryId" = "categories".id
          JOIN "teachersDisciplines" ON "teachersDisciplines".id = "tests"."teacherDisciplineId"
          JOIN "teachers" ON "teachersDisciplines"."teacherId" = "teachers".id
          WHERE "teachers".id = "outerTeachers".id
          GROUP BY "categories".id
        ) "categoryRow"
      ) AS "categories"
    FROM "teachers" "outerTeachers"
    GROUP BY "outerTeachers".id
  `;
}
