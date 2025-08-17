import { hash } from "argon2"
import { db } from "./cliente.ts"
import 'dotenv/config';


import { courses, enrollments, users } from "./schema.ts"

import { fakerPT_BR as faker } from '@faker-js/faker'



async function seed() {

    const passwordHash =  await hash( '8549830')

    const usersInsert = await db.insert(users).values([

        {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            role: 'student',
            password: passwordHash
        },

        {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            role: 'student',
            password: passwordHash
        },

        {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            role: 'student',
            password:passwordHash
        },

        {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            role: 'student',
            password: passwordHash
        },

        {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            role: 'student',
            password: await hash(passwordHash)
        },
    ]).returning()

    const coursesInsert = await db.insert(courses).values([
        { title: faker.lorem.words(4) },
        { title: faker.lorem.words(4) }
    ]).returning()


    await db.insert(enrollments).values([

        { coursesId: coursesInsert[0].id, userId: usersInsert[0].id },
        { coursesId: coursesInsert[0].id, userId: usersInsert[1].id },
        { coursesId: coursesInsert[1].id, userId: usersInsert[2].id },
    ])




}




seed();