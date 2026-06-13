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
        const money = await fastify.saleDropPayService.getUserWalletBalance(tokenData.userName);
        console.log(money);
        return {
                id: tokenData.userId,
                nickName: tokenData.userName,
                money: money // There is more optimal solutions
            };
    });
}

export default AboutMe;