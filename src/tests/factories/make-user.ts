import { faker } from "@faker-js/faker"
import { courses, users } from "../../database/schema.ts"
import { db } from "../../database/cliente"
import { hash } from "argon2"
import { randomUUID } from "node:crypto"
import jwt from "jsonwebtoken";


export async function makeUser(role?: 'manager' | 'student') {

    const passwordWithoutHash = randomUUID()

    const result = await db.insert(users).values({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: await hash(passwordWithoutHash),
        role
    }).returning()


    return {
        user: result[0],
        passwordWithoutHash

    }

}

export async function makeAuthenticatedUser(role: 'manager' | 'student') {
    const { user } = await makeUser(role);



    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is required')

    }


    const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET)


    return {user, token}


}