
import { describe, expect, test, beforeEach, jest } from '@jest/globals';
import { Request, Response } from 'express';
import { createResponse, createRequest } from 'node-mocks-http';
import 'reflect-metadata';
import { AbstractController } from '../../src/controllers/abstract-controller';


import { AuthenticationController } from '../../src/controllers/authentication.controller';
import { createTokens } from '../../src/utils/jwt.util';
import { AuthenticationServiceMock } from '../../__mocks__/services/authentication-service.mock';

// const paramsRequest = createRequest({ params: { sectId: 1 } });
// const response = createResponse(); 

class TestController extends AbstractController {

    public testHandleSuccess( value: any, resp: Response) {
        return this.handleSuccess(value, resp);
    }

    public testHandleError( value: any, resp: Response) {
        return this.handleError(value, resp);
    }
}


describe('Test abstract Controller', () => {

 
    beforeEach(() => {
    });


    test('test handleSuccess', () => {
        const response = createResponse(); 

        let testValue = {value: 'testValue'};

        let controller = new TestController();
        controller.testHandleSuccess( testValue, response);

        expect(response.statusCode).toBe(200);
        expect(response.json).toBeDefined();
    });

    test('test handleError', () => {
        const response = createResponse(); 

        let controller = new TestController();
        controller.testHandleError( 'testValue', response);

        expect(response.statusCode).toBe(500);
    });


});



