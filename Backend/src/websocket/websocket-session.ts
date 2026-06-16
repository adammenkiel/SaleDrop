export class WebSocketSession {
    public socket: any;
    public ticketId: string;
    public date: number;
    public sessionId: number;

    constructor(socket: any, ticketId: string, sessionId: number) {
        this.socket = socket;
        this.ticketId = ticketId;
        this.sessionId = sessionId;
        this.date = Date.now();
    }

    public onReceiveMessage(msg: Buffer) {
         const rawText = msg.toString("utf-8");
         const json = JSON.parse(rawText);
         if(json.keepAlive) {
            this.date = Date.now();
         }
    }

    public sendMessage(message: any) {
        this.socket.send(JSON.stringify(message));
    }
}