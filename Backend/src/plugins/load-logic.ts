import type { FastifyPluginAsync } from "fastify";
import { UserRepository } from "../repositories/user-repository";
import fp from "fastify-plugin";
import { EventCardRepository } from "../repositories/event-card-repository";
import { SaleDropPayService } from "../service/saledrop-pay-service";

declare module "fastify" {
  interface FastifyInstance {
    userRepository: UserRepository;
    eventCardRepository: EventCardRepository;
    saleDropPayRepository: SaleDropPayService;
  }
}

const LoadLogic : FastifyPluginAsync = async (
    fastify
) : Promise<void> => {
    console.log("Creating repositories...");
    fastify.decorate("userRepository", new UserRepository(fastify.db));
    fastify.decorate("eventCardRepository", new EventCardRepository(fastify.db));
    fastify.decorate("saleDropPayService", new SaleDropPayService(fastify.db));
    console.log("Created userRepository!");
};

export default fp(LoadLogic);