import { TicketIdBody } from "../schemas/ticket-schema";
import { WebSocketSession } from "./websocket-session";

export class WebSocketService {
    public sessions: Map<number, WebSocketSession>;
    public ticketSessions: Map<string, Set<WebSocketSession>>;
    public sessionId: number = 0;

    constructor() {
        this.sessions = new Map<number, WebSocketSession>();
        this.ticketSessions = new Map<string, Set<WebSocketSession>>();
    }

    public updateTicket(ticketId: string) {
        console.log(JSON.stringify(this.ticketSessions.get(ticketId)));
        this.ticketSessions.get(ticketId)?.forEach((session) => {
            session.socket.send(JSON.stringify({updateTicket: ticketId}));
        });
    }

    public updateTickets(tickets: TicketIdBody[]) {
        tickets.forEach(ticket => {
            this.updateTicket(String(ticket.ticket_id));
        });
    }

    public createSession(socket: any, ticketId: string) : WebSocketSession {
        const session: WebSocketSession = new WebSocketSession(
            socket,
            ticketId,
            this.sessionId
        );
        this.sessions.set(this.sessionId, session);
        if(!this.ticketSessions.has(session.ticketId)) {
            this.ticketSessions.set(session.ticketId, new Set<WebSocketSession>());
        }
        this.ticketSessions.get(session.ticketId)?.add(session);
        this.sessionId++;
        return session;
    }

    public removeSession(session: WebSocketSession) {
        this.sessions.delete(session.sessionId);
        this.ticketSessions.get(session.ticketId)?.delete(session);
    }

    public keepAlive() {
        const dateNow: number = Date.now();
        for (const sessionToken of [...this.sessions.keys()]) {
            const session: WebSocketSession | undefined = this.sessions.get(sessionToken);
            if(!session) {
                continue;
            }
            if(dateNow - session.date > 60000) {
                this.removeSession(session);
            }
            session.sendMessage({keepAlive: Date.now()});
        }
    }
}