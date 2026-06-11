import type { FastifyPluginAsync } from "fastify";

const App : FastifyPluginAsync = async (
  fastify
) : Promise<void> => {
    fastify.post('/', async (request, reply) => {
        return {message: "Test"};
    });
}

export default App;