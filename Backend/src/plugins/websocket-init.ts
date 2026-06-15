import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import websocket from "@fastify/websocket";
import { WebSocketService } from "../websocket/websocket-service";
import { WebSocketSession } from "../websocket/websocket-session";

declare module "fastify" {
  interface FastifyInstance {
    webSocketService: WebSocketService;
  }
}

type QueryBody = {
    ticketId: string
}

const WebSocketInitializer : FastifyPluginAsync = async (
    fastify
) => {
    await fastify.register(websocket);
    fastify.decorate("webSocketService", new WebSocketService());
    fastify.get<{Querystring: QueryBody}>("/ws", {websocket: true}, (request, reply) => {
        const socket = request.socket;
        fastify.webSocketService.addSession(new WebSocketSession(
            socket,
            reply.query.ticketId,
            request.cookies.token));
        socket.on("message", (msg: Buffer) => {
            //fastify.webSocketService.onReceiveMessage(msg);
        });
    });
}

export default fp(WebSocketInitializer);