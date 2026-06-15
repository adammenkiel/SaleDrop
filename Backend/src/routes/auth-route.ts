import type { FastifyPluginAsync } from "fastify";
import { UserProfile } from "../auth/user-profile";
import fp from "fastify-plugin";
import { AppError } from "../exception/app-errors";
import bcrypt from "bcrypt"
import { LoginSchema } from "../schemas/login-schema";
import { RegisterSchema } from "../schemas/register-schema";

const AuthRoute : FastifyPluginAsync = async (
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
            if(!await bcrypt.compare(request.body.password, user.password)) {
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
                sameSite: 'lax'
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
                const id = (await fastify.userRepository.findUserByName(request.body.username)).id;
                if(id === undefined) {
                    throw new AppError("User is null", 401);
                }
                fastify.log.info("Creating wallet for id: " + id)
                await fastify.saleDropPayService.createWallet(id, 1000);
            } catch(err) {
                if(err instanceof AppError) {
                    reply.code(err.errorCode).send(err.message);
                    return;
                }
                fastify.log.info(err);
                reply.code(500).send("Error: " + err);
                return;
            }

            reply.code(200).send("Registered!");
            return;
        }
    );
}

export default AuthRoute;