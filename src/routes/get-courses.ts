import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/cliente.ts";
import { courses, enrollments } from "../database/schema.ts";
import z, { number, promise } from "zod";
import { ilike, asc, and, eq, count } from 'drizzle-orm';
import { SQL } from 'drizzle-orm';
import { checkRequestJWT } from "./hooks/check-request-jwt.ts";
import { checkUserRole } from "./hooks/check-user-role.ts";





export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  server.get('/courses', {
    schema: {
      preHandle:[

        checkRequestJWT, 
        checkUserRole,

      ],

      tags: ['courses'], // para ela agrupar
      querystring: z.object({
        search: z.string().optional(),
        orderBy: z.enum(['id', 'title']).optional().default('id'),
        page: z.coerce.number().optional().default(1)
      }), // TODO QUERY STRING É OPCIONAL
      
      summary: 'Get all courses',
      response: {
        200: z.object({
          courses: z.array(
            z.object({
              id: z.uuid(),
              title: z.string(),
              // como tudo que vem na url é string, precisamos converter.
              errollments: z.number()
            }),
          ),
          total: z.number(),
        })
      }
    }
  }, async (request, reply) => {
    const { search, orderBy, page } = request.query; // <-- pegando da query string
    // order by é algo que nuunca será nulo porque já tem um valor padrão.

    const conditions: SQL[] = [];


    if (search) {
      conditions.push(ilike(courses.title, `%${search}%`))
    }

    const [result, total] = await Promise.all([

      db. select({ id: courses.id, title: courses.title, errollments: count(enrollments.id ) })
        .from(courses)
        .leftJoin(enrollments, eq(enrollments.coursesId, courses.id)).
        orderBy(asc(courses[orderBy])) // seria a mesma coisa de pegar o title.
        .offset((page - 1) * 2)
        .limit(2).where(and(...conditions)).groupBy(courses.id),
      ///  usamos left join porque mesmo que não tenha alunos matriculados ele irá trazer o curso independentemente.


      //   promisse 2
      db.$count(courses, and(...conditions)),




    ])



    return reply.send({ courses: result, total })


  });



}