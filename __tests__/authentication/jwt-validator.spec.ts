import { describe, expect, test, beforeEach } from '@jest/globals';
import { createRequest, createResponse } from 'node-mocks-http';
import { jwtGetToken, jwtRefreshValidator, jwtValidator } from '../../src/authentication/jwt-validator';
import { createTokens } from '../../src/utils/jwt.util';



describe('Test JWT authentication validator', () => {


    beforeEach(() => {
        // serviceMock = new CobAcntActvtyServiceMock();
        // controller = new AuthenticationController();
    });



    test('Test jwtGetToken from header', () => {
        const request = createRequest( {headers: {authorization: "Bearer Testing" }, params: { sectId: 1 } });
        const token = jwtGetToken(request);

        expect(token).toEqual("Testing");
    });

    test('Test jwtValidator with NO token', () => {
        const request = createRequest( {params: { sectId: 1 } });
        const response = createResponse(); 
        jwtValidator(request, response, () => {});

        expect(response.statusCode).toEqual(401);
        expect( request.user).toBeUndefined();
    });

    test('Test jwtValidator with Empty token', () => {
        const request = createRequest( {headers: {authorization: "Bearer " }, params: { sectId: 1 } });
        const response = createResponse(); 
        jwtValidator(request, response, () => {});

        expect(response.statusCode).toEqual(401);
        expect( request.user).toBeUndefined();
    });

    test('Test jwtValidator with bad token', () => {
        const request = createRequest( {headers: {authorization: "Bearer Testing" }, params: { sectId: 1 } });
        const response = createResponse(); 
        jwtValidator(request, response, () => {});

        expect(response.statusCode).toEqual(403);
        expect( request.user).toBeUndefined();
    });

    test('Test jwtValidator with refresh token', () => {
        const tokens = createTokens( 10, 'tester');
        const request = createRequest( {headers: {authorization: "Bearer "+ tokens.refreshToken.toString() }, params: { sectId: 1 } });
        const response = createResponse(); 
        jwtValidator(request, response, () => {});

        expect(response.statusCode).toEqual(403);
        expect(request.user).toBeUndefined();
    });


    test('Test jwtValidator with GOOD token', () => {
        const tokens = createTokens( 10, 'tester');
        const request = createRequest( {headers: {authorization: "Bearer "+ tokens.token.toString() }, params: { sectId: 1 } });
        const response = createResponse(); 
        jwtValidator(request, response, () => {});

        expect(response.statusCode).toEqual(200);
        expect(request.user).toBeDefined();
        expect(request.user!.name).toBe('tester');
    });


    test('Test jwtRefreshValidator with bad token', () => {
        const request = createRequest( {headers: {authorization: "Bearer Testing" }, params: { sectId: 1 } });
        const response = createResponse(); 
        jwtRefreshValidator(request, response, () => {});

        expect(response.statusCode).toEqual(403);
        expect( request.user).toBeUndefined();
    });

    test('Test jwtRefreshValidator with Empty token', () => {
        const request = createRequest( {headers: {authorization: "Bearer " }, params: { sectId: 1 } });
        const response = createResponse(); 
        jwtRefreshValidator(request, response, () => {});

        expect(response.statusCode).toEqual(401);
        expect( request.user).toBeUndefined();
    });

    test('Test jwtRefreshValidator with bad token', () => {
        const request = createRequest( {headers: {authorization: "Bearer Testing" }, params: { sectId: 1 } });
        const response = createResponse(); 
        jwtRefreshValidator(request, response, () => {});

        expect(response.statusCode).toEqual(403);
        expect( request.user).toBeUndefined();
    });

    test('Test jwtRefreshValidator with access token', () => {
        const tokens = createTokens( 10, 'tester');
        const request = createRequest( {headers: {authorization: "Bearer "+ tokens.token.toString() }, params: { sectId: 1 } });
        const response = createResponse(); 
        jwtRefreshValidator(request, response, () => {});

        expect(response.statusCode).toEqual(403);
        expect(request.user).toBeUndefined();
    });


    test('Test jwtRefreshValidator with GOOD token', () => {
        const tokens = createTokens( 10, 'tester');
        const request = createRequest( {headers: {authorization: "Bearer "+ tokens.refreshToken.toString() }, params: { sectId: 1 } });
        const response = createResponse(); 
        jwtRefreshValidator(request, response, () => {});

        expect(response.statusCode).toEqual(200);
        expect(request.user).toBeDefined();
        expect(request.user!.name).toBe('tester');
    });


});



// export const jwtGetToken = ( req: Request) => {
//     //Authorization: `Bearer ${this.auth.token}`
//     const authHeader = req.headers['authorization']
//     return  authHeader && authHeader.split(' ')[1]
// };


// export const jwtValidator = (req: Request, res: Response, next: NextFunction) => {

//     //Authorization: `Bearer ${this.auth.token}`
//     const token = jwtGetToken(req);

//     if (!token || token == "") {
//         return res.sendStatus(401);
//     }

//     console.log(token);

//     verify( token, jwtKey as string, (err: any, decoded: any) => {

//         if(err) {
//             console.log(err);
//             if( err instanceof TokenExpiredError ) {
//                 return res.sendStatus(401);
//             }
//             return res.sendStatus(403);
//         }
        
//         console.log(decoded);
//         let payload = new TokenPayload();
//         Object.assign( payload, decoded);

//         if(payload.tokenType != 'access') {
//             return res.sendStatus(403);
//         }

//         const user: User = {
//             id: payload.userId,
//             name: payload.userName,
//         };
//         req.user = user;
        
//         next();
//     });
// };

// export const jwtRefreshValidator = (req: Request, res: Response, next: NextFunction) => {

//         //Authorization: `Bearer ${this.auth.token}`
//         const token = jwtGetToken(req);
    
//         if (!token || token == "") {
//             return res.sendStatus(401);
//         }
    
//         console.log(token);
    
//         verify( token, jwtKey as string, (err: any, decoded: any) => {
    
//             if(err) {
//                 console.log(err);
//                 if( err instanceof TokenExpiredError ) {
//                     return res.sendStatus(401);
//                 }
//                 return res.sendStatus(403);
//             }
            
//             console.log(decoded);
//             const payload = new TokenPayload();
//             Object.assign( payload, decoded);

//             if( payload.tokenType != 'refresh') {
//                 return res.sendStatus(403);
//             }
//             const user: User = {
//                 id: payload.userId,
//                 name: payload.userName,
//             };
//             req.user = user;
            
//             next();
//         });
// };
