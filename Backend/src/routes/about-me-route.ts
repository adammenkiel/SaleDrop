import type { FastifyPluginAsync } from "fastify";
import { jwtDecode } from "jwt-decode";

type Token = {
    userId: string,
    userName: string
};

const AboutMe : FastifyPluginAsync = async (
  fastify
) : Promise<void> => {
    fastify.post('/api/me', async (request, reply) => {
        //Token is verified at page-preload.ts
        const token = request.cookies.token;
        if(token == null) {
            return;
        }
        const tokenData = jwtDecode<Token>(token);
        return {id: tokenData.userId, nickName: tokenData.userName};
    });
}

export default AboutMe;