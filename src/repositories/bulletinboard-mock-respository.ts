import { injectable } from 'inversify';
import { EdiMessage } from '../models/edi-message.model';
import { User } from '../types/custom';
import { IBulletinBoardRepository } from './interfaces/bulletinboard-repository.interface';



@injectable()
export class BulletinBoardMockRepository implements IBulletinBoardRepository {
   
    public  async updateMessages(user: User, message: EdiMessage[]): Promise<void> {
        return Promise.resolve();
    }


    public async fetchAll() : Promise<EdiMessage[]> {
        return this.fetchLatest();
    }

    public async fetchLatest() : Promise<EdiMessage[]> {
        const messages: EdiMessage[] = [ {application: 'Section 111',  message: 'This is a test message from Section 111'},
        {application: 'WCMSAP', message: 'This is a test message from WCMSAP'},
        {application: 'MSPRP', message: 'This is a test message from MSPRP'},
        {application: 'CRCP', message: 'This is a test message from CRCP'},
        {application: 'ECRS', message: 'This is a test message from ECRS'}];

        return Promise.resolve( messages) ;
    }
  

}
