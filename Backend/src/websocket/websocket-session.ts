export class WebSocketSession {
    public socket: any;
    public ticketId: string;
    public token: string;
    public date: number;

    constructor(socket: any, ticketId: string, token: string) {
        this.socket = socket;
        this.ticketId = ticketId;
        this.token = token;
        this.date = Date.now();
    }

    public onReceiveMessage(msg: Buffer) {
         const rawText = msg.toString("utf-8");
         const json = JSON.parse(rawText);
         if(json.keepAlive) {
            this.date = Date.now();
         }
         console.log(rawText);
    }

    public sendMessage(message: any) {
        this.socket.send(JSON.stringify(message));
    }
}