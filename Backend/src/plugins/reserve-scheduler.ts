import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
const ReserveScheduler: FastifyPluginAsync = async (
    fastify
) : Promise<void> => {
    fastify.log.info("Plugin scheduler!");
    
    const validate = async () => {
        const tickets = await fastify.reservationService.validateReservations();
        fastify.webSocketService.updateTickets(tickets);
    }

    setInterval(() => {
        validate();
    }, 30000);
}

export default fp(ReserveScheduler);