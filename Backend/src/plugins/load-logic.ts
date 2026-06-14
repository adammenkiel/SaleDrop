import type { FastifyPluginAsync } from "fastify";
import { UserRepository } from "../repositories/user-repository";
import fp from "fastify-plugin";
import { EventCardRepository } from "../repositories/event-card-repository";
import { SaleDropPayService } from "../service/saledrop-pay-service";
import { ReservationService } from "../service/reservation-service";

declare module "fastify" {
  interface FastifyInstance {
    userRepository: UserRepository;
    eventCardRepository: EventCardRepository;
    saleDropPayService: SaleDropPayService;
    reservationService: ReservationService;
  }
}

const LoadLogic : FastifyPluginAsync = async (
    fastify
) : Promise<void> => {
    console.log("Creating repositories...");
    fastify.decorate("userRepository", new UserRepository(fastify.db));
    fastify.decorate("eventCardRepository", new EventCardRepository(fastify.db));
    fastify.decorate("saleDropPayService", new SaleDropPayService(fastify.db));
    fastify.decorate("reservationService", new ReservationService(fastify.db));
    console.log("Created userRepository!");
};

export default fp(LoadLogic);