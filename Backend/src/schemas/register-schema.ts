
export const RegisterSchema = {
    type: "object",
    required: ["username", "email", "password"],
    properties: {
        username: {
            type: "string",
            minLength: 3,
            maxLength: 20
        },
        email: {
            type: "string",
            format: "email"
        },
        password: {
            type: "string",
            minLength: 6
        }
    }
};