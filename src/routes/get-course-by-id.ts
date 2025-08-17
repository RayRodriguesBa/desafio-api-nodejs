import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/cliente.ts";
import { courses } from "../database/schema.ts";
import z from "zod";
import { eq } from 'drizzle-orm';
import { checkRequestJWT } from "./hooks/check-request-jwt.ts";
import { getAuthenticatedUserFromRequest } from "../utils/get-authenticade-user-from-request.ts";





export  const getCourseByIdRoute: FastifyPluginAsyncZod= async (server )=>{
  

server.get('/courses/:id', {

  // usado para quando eu quero que algo seja executado antes da rota.
  preHandler:[
   checkRequestJWT 
 
  ],

  
  schema: {
  
   tags: ['courses'],
   
   summary:' Get couse by ID',// para ela agrupar 
     
   params: z.object({
    id:z.uuid()
   }),

   response:{
    200:z.object({
      course:z.object(
        {
          id:z.uuid(),
          title:z.string(),
          description:z.string().nullable()
        }
      )
    }),
    404: z.null().describe('Course not found'),
   }


  }}, async (request, reply) => {


    // se e ele não existee o código automaticament epara nãos egue para baixo.
    
  const user= getAuthenticatedUserFromRequest(request)

  const  courseId  = request.params.id;


  const result= await db.select().from(courses).where(eq(courses.id, courseId))


  if(result.length>0){
    return {course:result[0]}
  }


  return reply.status(404).send();


});



}