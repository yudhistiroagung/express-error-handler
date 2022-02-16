import express, { Request, Response, NextFunction } from 'express';

const PORT = 3000;
const app = express();

// parse request body to json object
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HTTP error base class
class HTTPError extends Error {
    constructor(public status: number, public message: string) {
        super(message);
    }
}

class UnauthorizedError extends HTTPError {
    constructor() {
        super(401, 'Unauthorized');
    }
}

class BadRequestError extends HTTPError {
    constructor(message: string = '') {
        super(400, message);
    }
}

class UknownError extends HTTPError {
    constructor(message: string = '') {
        super(500, 'Unknown Error :(');
    }
}

app.get('/', (_: Request, res: Response) => {
    res.json({
        message: 'Welcome to API'
    });
});

app.post('/error', (req: Request, res: Response) => {
    const { status } = req.body;

    let toBeThrownError: HTTPError = new UknownError();

    switch(status) {
        case 401: 
            toBeThrownError = new UnauthorizedError();
            break;
        case 400:
            toBeThrownError = new BadRequestError();
            break;
        default:
            break;
    }

    throw toBeThrownError;
});

/**
 * Middleware that handle custom HTTP Error
 * should be placed on the last
 */
app.use((error: HTTPError, req: Request, res: Response, next: NextFunction) => {
    const { status, message: errMsg } = error;
    const message = errMsg || undefined;
    res
        .status(status)
        .json({ message });
});

app.listen(PORT, () => {
    console.log('Server run on port ' + PORT);
});