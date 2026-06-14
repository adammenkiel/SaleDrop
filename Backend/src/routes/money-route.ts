import { FastifyPluginAsync } from "fastify";
import { jwtDecode } from "jwt-decode";
import { TicketIdBody, TicketSchema } from "../schemas/ticket-schema";
import { Token } from "../auth/token";


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


    fastify.post<{Body: TicketIdBody}>("/pay",
        {
            schema: {
                body: TicketSchema
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