import type { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

type JWTPayload={
  sub:string,
  role:'student' | 'manager'

}



export async function checkRequestJWT(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return reply.status(401).send({ error: "Token not provided" });
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET must be set.");
  }

  try {
   
    const [, token] = authHeader.split(" ");

    const payload = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
     request.user= payload;

  } catch (error) {
    return reply.status(401).send({ error: "Invalid or expired token" });
  }
}
