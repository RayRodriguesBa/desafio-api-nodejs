

import { table } from 'console';
import { pgTable, uuid, text, timestamp, uniqueIndex, pgEnum } from 'drizzle-orm/pg-core';


// quando temos um valor ou outro criamos um enum.

export    const userRoles= pgEnum('user_roles', [
  'student',
  'manager'
])

export const users= pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    name:text().notNull(),
    email: text().notNull().unique(),
    password: text().notNull(),
    role: userRoles().notNull().default('student')


})


export const courses= pgTable('courses',{
    id: uuid().primaryKey().defaultRandom(),
    title:text().notNull().unique(),
    description: text(),
    

})

export const enrollments = pgTable(
  'enrollments',
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid().notNull().references(() => users.id),
    coursesId: uuid().notNull().references(() => courses.id),
    createAdt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  table => [
    uniqueIndex().on(table.userId, table.coursesId) // evitar que o usuário se inscreva no mesmo curso mais de uma vez.
    
  ]
)



