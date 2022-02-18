import express, { Request, Response, NextFunction } from 'express';

import { payloadSchema } from './validations';
import { validateBody } from './middlewares';
import {
    HTTPError,
    BadRequestError,
    UnauthorizedError,
    UknownError
} from './exceptions';

const PORT = 3000;
const app = express();

// parse request body to json object
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (_: Request, res: Response) => {
    res.json({
        message: 'Welcome to API'
    });
});

app.post(
    '/error',
    validateBody(payloadSchema),
    (req: Request, res: Response) => {
        const { status } = req.body;

        let toBeThrownError: HTTPError = new UknownError();

        switch (status) {
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