//Nataniel_Souza34@gmail.com



import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/cliente.ts";
import { courses, users } from "../database/schema.ts";
import z from "zod";

import { eq } from "drizzle-orm";
import { verify } from "argon2"
import jwt from "jsonwebtoken";

/// efeutua o login e gera o token do usuário.

export const loginRoute: FastifyPluginAsyncZod = async (server) => {

    // estou criando uma session.

    server.post('/sessions', {
        schema: {
            body: z.object({
                email: z.email(),
                password: z.string()

            }),
            tags: ['auth'], // para ela agrupar 
            summary: 'Login',
            response: {
                200: z.object({ token: z.string() }).describe('Curso criado com sucesso'),
                400: z.object({ message:  z.string() }),





            }

        },


    }, async (request, reply) => {


        const { email, password } = request.body;


        const result = await db.select().from(users).where(eq(users.email, email))

        if (result.length === 0) {
            return reply.status(400).send({ message: 'Credenciais inválidas' })
        }


        const user = result[0]

        const doesPasswordMatch = await verify(user.password, password)

        if (!doesPasswordMatch) {
            return reply.status(400).send({ message: "Credenciais inválidas" })
        }




        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET must be set.')

        }



        // sub é basicamente uma convenção que informa quem criou o token.
        const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET)

        return reply.status(200).send({ token })


    });

}