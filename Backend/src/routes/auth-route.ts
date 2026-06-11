import type { FastifyPluginAsync } from "fastify";
import { RegisterBody, LoginBody, LoginSchema, RegisterSchema } from "../auth/auth-schemas";
import fp from "fastify-plugin";
import { AppError } from "../exception/app-errors";

const Auth : FastifyPluginAsync = async (
    fastify
) : Promise<void> => {
    fastify.post< { Body: LoginBody } >("/auth/login",
        {
            schema: {
                body: LoginSchema
            }
        },
        async (request, reply) => {
            
            return {message: request.body.username};
        }
    );

    fastify.post< { Body: RegisterBody } >("/api/auth/register",
         {
            schema: {
                body: RegisterSchema
            }
         },
        async (request, reply) => {
            try {
                await fastify.userRepository.saveUser(request.body);
            } catch(err) {
                if(err instanceof AppError) {
                    console.log(err);
                    reply.code(err.errorCode).send(err.message);
                    return;
                }
                console.log(err);
                reply.code(500).send("Error: " + err);
                return;
            }
            reply.code(200).send("Registered!");
            return;
        }
    );
}

export default fp(Auth)