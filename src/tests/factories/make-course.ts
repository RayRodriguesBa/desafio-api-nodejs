import { faker } from "@faker-js/faker"
import { courses } from "../../database/schema.ts"
import { db } from "../../database/cliente"

export  async  function makeCourse(title?: string){
    const result  = await db.insert(courses).values({
        title: title?? faker.lorem.words(4),
    }).returning()

     
    return result[0] // preciso fazer isso pporque independente ele semppre retorna um array.


}
