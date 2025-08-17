import { FastifyRequest } from "fastify";
// essa função recebe a request e verifica se o user existe 

export function getAuthenticatedUserFromRequest(request:FastifyRequest){

    const user = request.user

    if(!user){
        throw new Error('Invalid authentication')
    }

    return user;


    
}