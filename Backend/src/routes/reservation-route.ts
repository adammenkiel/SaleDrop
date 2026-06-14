import { FastifyPluginAsync } from "fastify";
import { TicketIdBody, TicketSchema } from "../schemas/ticket-schema";
import { jwtDecode } from "jwt-decode";
import { Token } from "../auth/token";

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
      const token = request.cookies.token;
      if(token == null) {
          return;
      }
      const tokenData = jwtDecode<Token>(token); // validated by page-preload.ts
      try {
        await fastify.reservationService.startReservation(tokenData.userId, request.body.ticket_id);
      } catch(err) {
        return false;
      }
      return true;
    }
  );
}
export default ReservationRoute;