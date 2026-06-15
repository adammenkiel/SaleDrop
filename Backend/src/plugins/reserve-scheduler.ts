import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
const ReserveScheduler: FastifyPluginAsync = async (
    fastify
) : Promise<void> => {
    fastify.log.info("Plugin scheduler!");
    setInterval(() => {
        fastify.reservationService.validateReservations();
    }, 30000);
}

export default fp(ReserveScheduler);