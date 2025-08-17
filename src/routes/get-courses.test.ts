import { expect, test } from 'vitest'
import request from 'supertest'
import { server } from '../app.ts'
import { faker } from '@faker-js/faker'
import { makeCourse } from '../tests/factories/make-course.ts'
import { randomUUID } from 'crypto'
import { enrollments } from '../database/schema.ts'



test('get courses', async () => {

    await server.ready()   // embora  a gente não esteja usando o servidor estancionado
    // o register demora um pouquinho por isso nós precisamos dele para esperar um pouco enquanto ele termina de fazer os registros das rotas da aplicação.


    const titleId = randomUUID()

    const course = await makeCourse(titleId)




    const response = await request(server.server).get(`/courses?search=${titleId}`)

    console.log(response.body)

    // aqui nós temos um problema porque eu não posso criar um curso e testar se   minha resposta terá ele
    // porque possa ser que ele esteja numa página muito longe da página retornada.
    // apagar o banco também não é uma boa estatégia porque os testes podem rodar em paralelo então pode ter teste que dependa daquele dado do banco.

    // o melhor então é usar os  filtros no mock.


    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
        total: 1,
        courses: [
            {
                id: expect.any(String),
                title: titleId,
                errollments: 0
            }
        ]
    });


})





