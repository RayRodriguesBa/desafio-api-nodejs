import fastify from 'fastify';
import crypto from 'node:crypto';
import { db } from './database/cliente.ts';
import { courses } from './database/schema.ts';
import { eq } from 'drizzle-orm';
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod';
import { z } from 'zod';
import fastifySwagger from '@fastify/swagger';
import { createCourseRoute } from './routes/create-course.ts';
import { getCoursesRoute } from './routes/get-courses.ts';
import { getCourseByIdRoute } from './routes/get-course-by-id.ts';
import scalaAPIReference from '@scalar/fastify-api-reference'
import { loginRoute } from './routes/login.ts';



const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>();


if (process.env.NODE_ENV === 'development') {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Desafio Node.js',
        version: '1.0.0'
      },

    },
    transform: jsonSchemaTransform,
  })

  server.register(scalaAPIReference, {
  routePrefix: '/docs',
  configuration: {
    theme: 'kepler' // opcional.
  }
})
}


server.setSerializerCompiler(serializerCompiler);
server.setValidatorCompiler(validatorCompiler);




server.register(createCourseRoute)
server.register(getCourseByIdRoute)
server.register(getCoursesRoute)
server.register(loginRoute)

export {server}