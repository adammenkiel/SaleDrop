import type { FastifyPluginAsync } from "fastify";

const EventCard : FastifyPluginAsync = async (
  fastify
) : Promise<void> => {
    fastify.post('/api/cards', async (request, reply) => {
        
        return fastify.eventCardRepository.getAll();
    });
}

export default EventCard;