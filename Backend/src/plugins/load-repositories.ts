import type { FastifyPluginAsync } from "fastify";
import { UserRepository } from "../repositories/user_repository";

declare module "fastify" {
  interface FastifyInstance {
    userRepository: UserRepository;
  }
}

const Auth : FastifyPluginAsync = async (
    fastify
) : Promise<void> => {
    fastify.decorate("userRepository", new UserRepository(fastify.db));
};

export default Auth;