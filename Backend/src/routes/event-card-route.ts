import type { FastifyPluginAsync } from "fastify";

const EventCard : FastifyPluginAsync = async (
  fastify
) : Promise<void> => {

    type ReqCardBody = {
        id: number;
    };

    fastify.get('/api/cards', async (request, reply) => {
        return fastify.eventCardRepository.getAll();
    });

    fastify.get< { Body: ReqCardBody } >('/api/card/:id',
        {
            schema: {
                params: {
                    type: "object",
                    required: ["id"],
                    properties: {
                        id: {
                            type: "number"
                        }
                    }
                }
            }
        },
        async (request, reply) => {
            const { id } = request.params as { id: number };
            return fastify.eventCardRepository.getEventCardById(id);
        }
    );
}

export default EventCard;