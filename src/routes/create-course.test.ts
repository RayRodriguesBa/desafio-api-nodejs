import { expect, test } from 'vitest'
import request from 'supertest'
import { server } from '../app.ts'
import { faker } from '@faker-js/faker'




test('create a course', async () => {

    await server.ready()   // embora  a gente não esteja usando o servidor estancionado
    // o register demora um pouquinho por isso nós precisamos dele para esperar um pouco enquanto ele termina de fazer os registros das rotas da aplicação.


    const response = await
        request(server.server)
            .post('/courses')
            .set('Content-Type', 'application/json')
            .send({ title: faker.lorem.words(4) })

    expect((response.status)).toEqual(201)

    expect(response.body).toEqual({
        courseId: expect.any(String)
    })


})





