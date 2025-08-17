import { expect, test } from 'vitest'
import request from 'supertest'
import { server } from '../app.ts'
import { faker } from '@faker-js/faker'
import { makeCourse } from '../tests/factories/make-course.ts'
import { makeAuthenticatedUser } from '../tests/factories/make-user.ts'




test('get a course by id', async () => {

    await server.ready()   // embora  a gente não esteja usando o servidor estancionado
    // o register demora um pouquinho por isso nós precisamos dele para esperar um pouco enquanto ele termina de fazer os registros das rotas da aplicação.

    const {token}= await makeAuthenticatedUser('student')



    const course= await makeCourse(); // antes dele testar que eu consigo buscar um curso ele cria um curso para garantir que ele exista no banco sem que eu tenha que ir lá e peggar de um

 const response = await request(server.server)
     .get(`/courses/${course.id}`) 
    .set('Authorization', `Bearer ${token}`);

    expect((response.status)).toEqual(200)
    expect(response.body).toEqual({
        course:{
            id: expect.any(String),
            title: expect.any(String),
            description: null
        }
    })


})



test('return 404 for non existing course', async () => {

    await server.ready()   

      const {token}= await makeAuthenticatedUser('student')




 const response = await request(server.server)
    .get('/courses/8ebf2aa1-a090-46a6-9968-f9b3079b63a2')
    .set('Authorization', `Bearer ${token}`);

    expect((response.status)).toEqual(404)



})







