
export const LoginSchema = {
    type: "object",
    required: ["username", "password"],
    properties: {
        username: {
            type: "string"
        },
        password: {
            type: "string"
        }
    }
}

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