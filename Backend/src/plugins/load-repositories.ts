import type { FastifyPluginAsync } from "fastify";
import { UserRepository } from "../repositories/user-repository";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    userRepository: UserRepository;
  }
}

const Auth : FastifyPluginAsync = async (
    fastify
) : Promise<void> => {
    console.log("Creating repositories...");
    fastify.decorate("userRepository", new UserRepository(fastify.db));
    console.log("Created userRepository!");
};

export default fp(Auth);