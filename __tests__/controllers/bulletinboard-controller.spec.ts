
import { describe, expect, test, beforeEach, jest } from '@jest/globals';
import { createResponse, createRequest } from 'node-mocks-http';
import 'reflect-metadata';

import { BulletinBoardController } from '../../src/controllers/bulletinboard.controller';
import { BulletinBoardServiceMock } from '../../__mocks__/services/bulletinboard-service.mock';


describe('Test bulletinboard Controller', () => {

    const testRecord = [ {application: 'test', message:'test message' }, {application:'test', message:'this is only a test'}];

    let serviceMock: BulletinBoardServiceMock;
    let controller: BulletinBoardController ;

    beforeEach(() => {
        serviceMock = new BulletinBoardServiceMock();
        controller = new BulletinBoardController(serviceMock);
    });



    test('test getLatest', () => {

        const request = createRequest({ body: { username: "mockuser", password: "ASDF"} });
        const response = createResponse(); 

        const spy = jest.spyOn(serviceMock, 'getLatestMessages');
        controller.getLatestBulletinBoardMessages(request, response, () => { return; });

        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(200);
        expect(response.json).toBeDefined();
    });

    test('test updateMessages', () => {

        const request = createRequest({ body: testRecord });
        const response = createResponse(); 

        const spy = jest.spyOn(serviceMock, 'updateMessages');
        controller.updateBulletinBoardMessages(request, response, () => { return; });

        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(200);
        expect(response.json).toBeDefined();
    });

    test('test updateMessages with bad data', () => {

        const request = createRequest({ });
        const response = createResponse(); 

        const spy = jest.spyOn(serviceMock, 'updateMessages');
        controller.updateBulletinBoardMessages(request, response, () => { return; });

        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(200);
        expect(response.json).toBeDefined();
    });

});



