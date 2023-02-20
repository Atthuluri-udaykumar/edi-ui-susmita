

import { inject, injectable } from 'inversify';
import { EdiMessage } from '../models/edi-message.model';
import { IBulletinBoardRepository } from '../repositories/interfaces/bulletinboard-repository.interface';
import { User } from '../types/custom';
import { Symbols } from '../utils/types';
import { IBulletinBoardService} from './interfaces/bulletinboard-service.interface';

/**
 * CobAcntActvty Service
 */
@injectable()
export class BulletinBoardService implements IBulletinBoardService {

    constructor(@inject(Symbols.IBulletinBoardRepository)  private repository: IBulletinBoardRepository) {

    }


    async getLatestMessages(): Promise<EdiMessage[]> {
        try {
            let messages: EdiMessage[] = await this.repository.fetchLatest();
            messages.forEach( (m) => {
                m.message = this.prepareMessageForDisplay(m.message);
            })
            return Promise.resolve(messages);

        } catch (error: any) {
            error.message ??= "Unknown error message";
            return Promise.reject(error);
        }
 
    }

    async updateMessages(user: User, messages: EdiMessage[]): Promise<void> {
        try {
            messages.forEach( (m) => {
                m.message = this.prepareMessageForDatabase(m.message);
            })
           return this.repository.updateMessages(user, messages);

        } catch (error: any) {
            error.message ??= "Unknown error message";
            return Promise.reject(error);
        }
    }


    prepareMessageForDatabase( message: string) : string {
        return '<p>' + message.split(/\r\n|\r|\n/).join('</p><p>') + '</p>';
    }
    
    prepareMessageForDisplay( message: string): string {
        return message.split('</p><p>').join('\r\n').replace('</p>', '').replace('<p>', '');
    }
    
}
