import type { FastifyPluginAsync } from "fastify";
import { UserRepository } from "../repositories/user-repository";
import fp from "fastify-plugin";
import { EventCardRepository } from "../repositories/event-card-repository";

declare module "fastify" {
  interface FastifyInstance {
    userRepository: UserRepository;
    eventCardRepository: EventCardRepository;
  }
}

const Auth : FastifyPluginAsync = async (
    fastify
) : Promise<void> => {
    console.log("Creating repositories...");
    fastify.decorate("userRepository", new UserRepository(fastify.db));
    fastify.decorate("eventCardRepository", new EventCardRepository(fastify.db));
    console.log("Created userRepository!");
};

export default fp(Auth);