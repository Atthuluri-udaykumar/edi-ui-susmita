import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { injectable } from 'inversify';
import { HttpException } from '../models/HttpException';
import { loggable } from '../utils/logger.util';
import { logger } from '../utils/winston.config';

@injectable()
export abstract class AbstractController {

    @loggable()
    protected handleSuccess(value: any, res: Response): void {
        res
            .status(200)
            .json(value);
    }

    @loggable()
    protected handleError(error: any, res: Response): void {
        logger.error(error);
        res.status(500).send(error.message);
    }

    protected validateReceivedData(req: Request): void {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            logger.error('HTTP Request Failed ' + JSON.stringify(errors));
            throw new HttpException(422, 'Validation failed, invalid data received.');
        }
    }
}
