
import { describe, expect, test, beforeEach, jest } from '@jest/globals';
import { Request, Response } from 'express';
import { createResponse, createRequest } from 'node-mocks-http';
import 'reflect-metadata';


import { AuthenticationController } from '../../src/controllers/authentication.controller';
import { createTokens } from '../../src/utils/jwt.util';
import { AuthenticationServiceMock } from '../../__mocks__/services/authentication-service.mock';

// const paramsRequest = createRequest({ params: { sectId: 1 } });
// const response = createResponse(); 

describe('Test authentication Controller', () => {

 
    let serviceMock: AuthenticationServiceMock;
    let controller: AuthenticationController ;

    beforeEach(() => {
        serviceMock = new AuthenticationServiceMock();
        controller = new AuthenticationController(serviceMock);
    });



    test('test login with username and password', () => {

        const request = createRequest({ body: { username: "mockuser", password: "ASDF"} });
        const response = createResponse(); 

        const spy = jest.spyOn(serviceMock, 'authenticateUser');
        controller.login(request, response, () => { return; });

        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(200);
        expect(response.json).toBeDefined();
    });

    test('test login without username and password', () => {

        const request = createRequest({ body: { } });
        const response = createResponse(); 

        const spy = jest.spyOn(serviceMock, 'authenticateUser');
        controller.login(request, response, () => {} );

        expect(spy).toReturn();
        // expect(response.statusCode).toBe(500);
    });

    test('test refresh', () => {
        const tokens = createTokens( 10, 'mockuser');
        const request = createRequest( {headers: {authorization: "Bearer "+ tokens.refreshToken.toString() }, params: { sectId: 1 } });
        const response = createResponse(); 

        controller.refresh(request, response, () => { return; });

        expect(response.statusCode).toBe(200);
        expect(response.json).toBeDefined();
    });



    test('test logout', () => {

        const request = createRequest({ body: { user: { id: 1234, name: 'mockuser'} } });
        const response = createResponse(); 

        controller.logout(request, response, () => { return; });

        expect(response.statusCode).toBe(200);
    });


});



