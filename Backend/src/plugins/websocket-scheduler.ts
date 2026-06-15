import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
const WebSocketScheduler: FastifyPluginAsync = async (
    fastify
) : Promise<void> => {
    
    setInterval(() => {
        fastify.webSocketService.keepAlive();
    }, 30000);
}

export default fp(WebSocketScheduler);