import { sign } from "jsonwebtoken";
import { createTokenPayload } from "../models/token-payload";
import { User } from "../types/custom";
import { jwtKey } from "./app.config";

     
export function createTokens( personId: number, name: string) : any {
    const access = createTokenPayload( 'access', personId, name );
    const refresh = createTokenPayload( 'refresh', personId, name );

    const accessToken = sign( Object.assign({}, access), jwtKey as string, { expiresIn: '15m'});
    const refreshToken = sign( Object.assign({}, refresh), jwtKey as string, { expiresIn: '1h'});
    return {  personId: personId, token: accessToken, refreshToken: refreshToken };
}

export function createTokensForUser( user: User): any  {
    return createTokens( user.id, user.name);
}