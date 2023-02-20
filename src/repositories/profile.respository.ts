import { injectable } from 'inversify';
import { ProfileModel } from '../models/profile.model';
import { http } from '../utils/http';
import { IProfileRepository } from './interfaces/profile-repository.interface';



@injectable()
export class ProfileRepository implements IProfileRepository {

    public async fetchProfile(): Promise<ProfileModel> {
        let result: ProfileModel ;

        try {
            let resp = await http.get("getProfile");
            result = resp.data
            return Promise.resolve(result);

        } catch (error: any) {
            error.message ??= "Unknown error message";
            return Promise.reject(error);
        }
    }


}
