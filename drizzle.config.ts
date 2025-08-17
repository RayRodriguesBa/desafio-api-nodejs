import {defineConfig} from 'drizzle-kit';


if(!process.env.DATABASE_URL) {
    throw new Error ( 'DATABASE_URL env is required');

}

export default defineConfig({
    dialect:'postgresql',
    dbCredentials:    {

        url:process.env.DATABASE_URL,
    },
    out:'./drizzle', // onde vão ser jogados os arquivos gerados automaticamente o drizzle.
    schema:'./src/database/schema.ts'  // onde estão os arquivos que vão definir quais tabelas  eu vou ter no banco de dados.

});