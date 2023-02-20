
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { authenticateJwtToken } from '../authentication/jwt-validator';

import { IAuthenticationService } from '../services/interfaces/authentication-service.interface';
import { logger } from '../utils/winston.config'; 
import { setErrorResponse, setSuccessResponse } from '../utils/ediresponse.util';
import { createTokens, createTokensForUser } from '../utils/jwt.util';
import { loggable } from '../utils/logger.util';
import { Symbols } from '../utils/types';
import { AbstractController } from './abstract-controller';
import { IAuthenticationController } from './interfaces/authentication-controller.interface';

/**
 * AuthenticationController Controller
 */
@injectable()
export class AuthenticationController extends AbstractController implements IAuthenticationController {

    constructor(@inject(Symbols.IAuthenticationService)  private service: IAuthenticationService) {
        super();
    }
    
    @loggable(false, false)
    public async login( req: Request, res: Response, next: NextFunction): Promise<void>{
        
        try {
            // authenticate the user, then return the jwt
            const user = await this.service.authenticateUser(req.body.username, req.body.password);
            return setSuccessResponse( createTokensForUser( user), res);
            
        } catch (error) {
            logger.error(error);
            return setErrorResponse(res, error);
        }
    }

    public async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
        // if we get here, the request has a valid token and the User object should be set for us to use. 
        // But we are going to decode the payload to validate ourselves
        try {
            const payload = authenticateJwtToken(req, 'refresh');
            logger.debug(payload.userId);
            return setSuccessResponse( createTokens( payload.userId, payload.userName), res);
        } catch (err) {
            logger.error( err);
            return setErrorResponse(res, err);
        }
    }


    public async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            return setSuccessResponse("logout success", res);
        } catch (error) {
            logger.error( error);
            return setErrorResponse(res, error);
        }
    }
}
