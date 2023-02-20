
import { injectable } from 'inversify';
import { IAuthenticationService} from '../../src/services/interfaces/authentication-service.interface';
import { User } from '../../src/types/custom';

/**
 * AuthenticationServiceMock Service
 */
@injectable()
export class AuthenticationServiceMock implements IAuthenticationService {

    // only  mockuser is valid user name
    async authenticateUser(username: any, password: any): Promise<User> {
        if( username == "mockuser") {
            return Promise.resolve({ id: 1, name: 'mockuser'});
        }
        // throw new Error('Method not implemented.');
        return Promise.reject('Unknown user');
    }

}
