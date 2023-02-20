
import { injectable } from "inversify";
import { User } from "../types/custom";
import { IAuthenticationService } from "./interfaces/authentication-service.interface";

@injectable()
export class AuthenticationService implements IAuthenticationService {

    // constructor(@inject(Symbols.IBulletinBoardRepository)  private repository: IBulletinBoardRepository) {
    // }

    async authenticateUser(username: any, password: any): Promise<User> {
        // random generate for now person Id
        const personId = this.between( 10000, 99999 );
        let user: User = { id: personId, name: username};
        return Promise.resolve(user);
    }


    public between(min: number, max: number) : number {  
        return Math.floor(
          Math.random() * (max - min) + min
        )
      }

}