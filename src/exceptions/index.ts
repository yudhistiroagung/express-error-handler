// HTTP error base class
export class HTTPError extends Error {
    constructor(public status: number, public message: string) {
        super(message);
    }
}

export class UnauthorizedError extends HTTPError {
    constructor() {
        super(401, 'Unauthorized');
    }
}

export class BadRequestError extends HTTPError {
    constructor(message: string = 'Bad Request') {
        super(400, message);
    }
}

export class UknownError extends HTTPError {
    constructor(message: string = 'Unknown Error :(') {
        super(500, message);
    }
}