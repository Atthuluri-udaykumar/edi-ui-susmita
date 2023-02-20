
import { injectable } from 'inversify';
import { EdiMessage } from '../../src/models/edi-message.model';
import { IBulletinBoardService } from '../../src/services/interfaces/bulletinboard-service.interface';
import { User } from '../../src/types/custom';

/**
 * BulletinBoardServiceMock Service
 */
@injectable()
export class BulletinBoardServiceMock implements IBulletinBoardService {
   
    async updateMessages(user: User, messages: EdiMessage[]): Promise<void> {
        return Promise.resolve();
    }

    async getLatestMessages(): Promise<EdiMessage[]> {
        return Promise.resolve([]);
    }


}
