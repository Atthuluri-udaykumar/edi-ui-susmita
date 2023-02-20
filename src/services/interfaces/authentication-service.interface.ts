
import { User } from "../../types/custom";


export interface IAuthenticationService {
    authenticateUser(username: any, password: any): Promise<User>;
}