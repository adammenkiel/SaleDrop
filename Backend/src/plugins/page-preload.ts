import { FastifyPluginAsync } from "fastify"
import fp from "fastify-plugin"

const PreRequest : FastifyPluginAsync = async (
    fastify
) : Promise<void> => {
    fastify.addHook("onRequest", (request, reply, done) => {

        if(request.url.startsWith("/api/auth") || request.url == "/api/cards") {
            done();
            return;
        }
        if(request.cookies === undefined) {
            reply.code(401).send("Token is required");
            return;
        }
        const token = request.cookies.token;
        if(token === undefined) {
            reply.code(401).send("Token is required");
            return;
        }
        try {
            const res = fastify.jwt.verify(token);
        } catch(err) {
            reply.code(401).send("Verification failed!");
            return;
        }
        done();
    });
}

export default fp(PreRequest);