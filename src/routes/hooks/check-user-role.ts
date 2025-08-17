

import type { FastifyRequest, FastifyReply } from "fastify";
import { getAuthenticatedUserFromRequest } from "../../utils/get-authenticade-user-from-request.ts";



// considerando que ele já foi autenticado

export  function checkUserRole(role:'student'|'manager'){

    return async  (request: FastifyRequest, reply: FastifyReply)=> {
  
    const user= getAuthenticatedUserFromRequest(request)

    if(user.role!==role){
        return reply.status(401).send()
    }





}



}