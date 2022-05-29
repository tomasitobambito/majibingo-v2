export class TileRequest {
    text: string;
    emote: string;
}

export class UserRequest {
    username: string;
    password: string;
}

export class Validation {
    valid: boolean = true;
    message: string[] = [];
    fields: string[] = [];
}