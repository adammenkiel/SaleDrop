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
        ticket_id: string;
    }

    fastify.post<{Body: PayMoneyAmountBody}>("/pay",
        {
            schema: {
                body: {
                    type: "object",
                    required: ["ticket_id"],
                    properties: {
                        ticket_id: {
                            type: "string"
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

            return fastify.saleDropPayService.payForTicket(tokenData.userName, request.body.ticket_id);
        }
    );
}

export default PayRoute;