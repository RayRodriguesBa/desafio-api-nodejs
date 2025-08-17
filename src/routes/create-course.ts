

import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/cliente.ts";
import { courses } from "../database/schema.ts";
import z from "zod";
import { checkRequestJWT } from "./hooks/check-request-jwt.ts";
import { checkUserRole } from "./hooks/check-user-role.ts";


export  const createCourseRoute: FastifyPluginAsyncZod= async (server )=>{
   server.post('/courses', { 


      preHandler:[

         checkRequestJWT,  checkUserRole('manager')
      ],


    schema:{ 
       body: z.object({ title:z.string().min(5, 'título precisa ter 5 caracteres')}),
    tags:['courses'], // para ela agrupar 
    summary:'Create a course',
    description:' Essa rota recebe um título e cria um curso no banco de dados',

    response:{
      201:z.object({courseId:z.uuid()}).describe('Curso criado com sucesso')
    }
  
  
  },
    
  
  },  async (request, reply) => {
   
   
     
     const { title } = request.body;
   

   
     const body = request.body ;
   
     const courseTitle= body.title;
   
   
     const result= await db.insert(courses).values({title:courseTitle}).returning();
   
   
   
   
     return reply.status(201)  .send({courseId: result[0].id})
   
   
   });

}