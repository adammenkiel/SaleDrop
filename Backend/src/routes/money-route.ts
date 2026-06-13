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
        const tokenData = jwtDecode<Token>(token); // validated by page-preload.ts

        return fastify.saleDropPayService.getUserWalletBalance(tokenData.userName);
    });

    type PayMoneyAmountBody = {
        money: number;
    }

    fastify.post<{Body: PayMoneyAmountBody}>("/pay",
        {
            schema: {
                body: {
                    type: "object",
                    required: ["money"],
                    properties: {
                        money: {
                            type: "number",
                            minimum: 0
                        }
                    }
                }
            }
        },
        async (request, reply) => {
            const token = request.cookies.token;
            if(token == null) {
                return;
            }
            const tokenData = jwtDecode<Token>(token); // validated by page-preload.ts

            return fastify.saleDropPayService.payMoney(tokenData.userName, request.body.money);
        }
    );
}

export default PayRoute;