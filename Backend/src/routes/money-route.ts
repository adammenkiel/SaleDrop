import { FastifyPluginAsync } from "fastify";
import { jwtDecode } from "jwt-decode";


type Token = {
    userId: string,
    userName: string
};

const PayRoute : FastifyPluginAsync = async (
    fastify
) => {

    fastify.get("/balance", async (request, reply) => {
        const token = request.cookies.token;
        if(token == null) {
            return;
        }
        const tokenData = jwtDecode<Token>(token);

        return fastify.saleDropPayService.getUserWalletBalance(tokenData.userName);
    });

    fastify.post("/pay", async (request, reply) => {

    });
}

export default PayRoute;