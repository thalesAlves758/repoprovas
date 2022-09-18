import { Test } from '@prisma/client';
import { prisma } from '../config/database';
import {
  TestGroupedByDisciplineData,
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
