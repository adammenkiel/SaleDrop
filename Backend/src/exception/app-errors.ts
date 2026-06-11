export class AppError extends Error {

    public errorCode: number;

    constructor(message = "App error", errorCode: number) {
        super(message);
        this.errorCode = errorCode; 
    }
}