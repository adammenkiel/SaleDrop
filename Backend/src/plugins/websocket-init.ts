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
    fastify.get<{Querystring: QueryBody}>("/ws", {websocket: true}, (connection, req) => {
        const socket = connection;
        if(!socket) {
            console.log("ERROR! Socket is null! Connection:" + typeof socket);
            return;
        }
        if(!req.cookies) {
            socket.close();
            return;
        }
        const token = req.cookies.token;
        if(token === undefined) {
            socket.close();
            return;
        }
        try {
            const res = fastify.jwt.verify(token);
        } catch(err) {
            socket.close();
            return;
        }

        const wsSession: WebSocketSession = new WebSocketSession(
            socket,
            req.query.ticketId,
            token);

        fastify.webSocketService.addSession(wsSession);
        
        socket.on("message", (msg: Buffer) => {
            wsSession.onReceiveMessage(msg);
        });
    });
}

export default fp(WebSocketInitializer);