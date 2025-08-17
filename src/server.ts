
import {server} from    './app.ts'

server.listen({ port: 3333 , host:'0.0.0.0'}).then(() => {
  console.log('http://localhost:3333/courses');
});

