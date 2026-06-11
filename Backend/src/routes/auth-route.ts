import type { FastifyPluginAsync } from "fastify";
import { LoginSchema, RegisterSchema } from "../auth/auth-schemas";
import { UserProfile } from "../auth/user-profile";
import fp from "fastify-plugin";
import { AppError } from "../exception/app-errors";
import bcrypt from "bcrypt"

const Auth : FastifyPluginAsync = async (
    fastify
) : Promise<void> => {
    fastify.post< { Body: UserProfile } >("/api/auth/login",
        {
            schema: {
                body: LoginSchema
            }
        },
        async (request, reply) => {
            const user = await fastify.userRepository.findUserByName(request.body.username);
            if(!bcrypt.compare(request.body.password, user.password)) {
                throw new AppError("Wrong password", 401);
            }
            const token = fastify.jwt.sign(
                {userId: user.id, userName: user.username},
                {expiresIn: "1h"}
            );

            reply.setCookie("token", token, {
                path: '/',
                httpOnly: true,
                secure: false,
                maxAge: 60*60,
                sameSite: 'none'
            });

            reply.code(200).send("Logged in!");
        }
    );

    fastify.post< { Body: UserProfile } >("/api/auth/register",
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