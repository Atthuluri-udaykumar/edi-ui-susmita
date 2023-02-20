

import { inject, injectable } from 'inversify';
import { EdiMessage } from '../models/edi-message.model';
import { ProfileModel } from '../models/profile.model';
import { IBulletinBoardRepository } from '../repositories/interfaces/bulletinboard-repository.interface';
import { IProfileRepository } from '../repositories/interfaces/profile-repository.interface';
import { User } from '../types/custom';
import { Symbols } from '../utils/types';
import { IBulletinBoardService } from './interfaces/bulletinboard-service.interface';
import { IProfileService } from './interfaces/profile.service.interface';

/**
 * CobAcntActvty Service
 */
@injectable()
export class ProfileService implements IProfileService {

    constructor(@inject(Symbols.IProfileRepository) private repository: IProfileRepository) {
    }

    async getProfile(): Promise<ProfileModel> {
        try {
            let messages: ProfileModel = await this.repository.fetchProfile();
            return Promise.resolve(messages);

        } catch (error: any) {
            error.message ??= "Unknown error message";
            return Promise.reject(error);
        }
    }



}
