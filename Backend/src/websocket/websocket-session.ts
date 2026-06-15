export class WebSocketSession {
    public socket: any;
    public ticketId: string;
    public token: string;

    constructor(socket: any, ticketId: string, token: string) {
        this.socket = socket;
        this.ticketId = ticketId;
        this.token = token;
    }

}