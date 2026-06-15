import { WebSocketSession } from "./websocket-session";

export class WebSocketService {
    public sessions: Map<string, WebSocketSession>;
    public ticketSessions: Map<string, Set<WebSocketSession>>;

    constructor() {
        this.sessions = new Map<string, WebSocketSession>();
        this.ticketSessions = new Map<string, Set<WebSocketSession>>();
    }

    public updateTicket(ticketId: string) {
        this.ticketSessions.get(ticketId)?.forEach((session) => {
            session.socket.send(JSON.stringify({updateTicket: ticketId}));
        });
    }

    public updateTickets(tickets: string[]) {
        tickets.forEach(ticket => {
            this.updateTicket(ticket);
        });
    }

    public addSession(session: WebSocketSession) {
        this.sessions.set(session.token, session);
        if(!this.ticketSessions.has(session.ticketId)) {
            this.ticketSessions.set(session.ticketId, new Set<WebSocketSession>());
        }
        this.ticketSessions.get(session.ticketId)?.add(session);
    }

    public removeSession(session: WebSocketSession) {
        this.sessions.delete(session.token);
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