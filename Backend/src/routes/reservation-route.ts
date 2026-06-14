import { FastifyPluginAsync } from "fastify";
import { TicketIdBody, TicketSchema } from "../schemas/ticket-schema";

const ReservationRoute : FastifyPluginAsync = async (
  fastify
) : Promise<void> => {
  fastify.post<{Body: TicketIdBody}>("/reserve", 
    {
      schema: {
        body: TicketSchema
      }
    },
    async (request, reply) => {
      
  });
}