
import express from 'express';
import { inject, injectable } from 'inversify';
import { jwtRefreshValidator } from '../authentication/jwt-validator';
import { IAuthenticationController } from '../controllers/interfaces/authentication-controller.interface';
import { loggable } from '../utils/logger.util';
import { Symbols } from '../utils/types';
import { CustomRouter } from './interfaces/custom-router.interface';

@injectable()
export class AuthenticationRouter implements CustomRouter {
    public path = '/auth';
    public router = express.Router();

    constructor(  @inject(Symbols.IAuthenticationController) private controller: IAuthenticationController) {
        this.initializeRoutes();
    }

    @loggable()
    private initializeRoutes(): void {

		this.router.post('/login', this.controller.login.bind(this.controller));

        this.router.post('/logout', this.controller.logout.bind(this.controller));

        this.router.get('/refresh', [jwtRefreshValidator], this.controller.refresh.bind(this.controller));
    }
}
