import { Request, Response, NextFunction } from 'express';
import { TokenExpiredError, verify } from 'jsonwebtoken';
import { TokenPayload } from '../models/token-payload';
import { User } from '../types/custom';
import { jwtKey } from '../utils/app.config';


export class TokenTypeError extends Error {}
export class TokenMissingError extends Error {}


export const jwtGetToken = ( req: Request) => {
    //Authorization: `Bearer ${this.auth.token}`
    const authHeader = req.headers['authorization']
    return  authHeader && authHeader.split(' ')[1]
};


export const jwtValidator = (req: Request, res: Response, next: NextFunction) => {
    return jwtTypeValidator( req, res, next, 'access');
};

export const jwtRefreshValidator = (req: Request, res: Response, next: NextFunction) => {
    return jwtTypeValidator( req, res, next, 'refresh');
};

export const jwtTypeValidator = (req: Request, res: Response, next: NextFunction, tokenType: string) => {

    try {
        const payload = authenticateJwtToken(req, tokenType);
        
        const user: User = {
            id: payload.userId,
            name: payload.userName,
        };
        req.user = user;
        
        next();
    } catch (err) {
        if( err instanceof TokenExpiredError) {
            return res.sendStatus(401);
        } else if ( err instanceof TokenMissingError ) {
            return res.sendStatus(401);
        } else if( err instanceof TokenTypeError ) {
            return res.sendStatus(403);
        } else {
            return res.sendStatus(403);
        }
    }
};



/**
    returns token payload
    throws:
        TokenMissingError
        TokenTypeError
        TokenExpiredError
*/
export function authenticateJwtToken (req: Request, tokenType: string): TokenPayload  {

    //Authorization: `Bearer ${this.auth.token}`
    const token = jwtGetToken(req);

    if (!token || token == "") {
        throw new TokenMissingError( "missing token");
    }

    console.debug(token);

    try {
        let decoded = verify( token, jwtKey );

        console.debug(decoded);
        const payload = new TokenPayload();
        Object.assign( payload, decoded);

        if( payload.tokenType != tokenType) {
            throw new TokenTypeError("invalid token payload");
        }
        return payload;

    } catch (err) {
        console.error(err);
        throw err;
    }
};
