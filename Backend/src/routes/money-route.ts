import { FastifyPluginAsync } from "fastify";
import { jwtDecode } from "jwt-decode";
import { TicketIdBody, TicketSchema } from "../schemas/ticket-schema";
import { Token } from "../auth/token";
import { AppError } from "../exception/app-errors";


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
            if(await fastify.reservationService.checkReservation(tokenData.userId, request.body.ticket_id) === false) {
                return false; //add throw?
            }
            try {
                const val = await fastify.saleDropPayService.payForTicket(tokenData.userName, request.body.ticket_id);
                return val;
            } catch (err) {
                if(err instanceof AppError) {
                    reply.code(err.errorCode).send(err.message);
                    return;
                }
                reply.code(500).send("UNKNOWN");
            }
        }
    );
}

export default PayRoute;