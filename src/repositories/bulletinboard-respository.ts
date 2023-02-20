import { injectable } from 'inversify';
import { EdiMessage } from '../models/edi-message.model';
import { MirEdiCntntTbl } from '../models/miredicntnttbl.model';
import { TranslatorService } from '../services/translator-service';
import { User } from '../types/custom';
import { http } from '../utils/http';
import { IBulletinBoardRepository } from './interfaces/bulletinboard-repository.interface';



@injectable()
export class BulletinBoardRepository implements IBulletinBoardRepository {
    
    public async updateMessages(user: User, messages: EdiMessage[]): Promise<void> {

        try {
            for(const element of messages) {
                const msg: MirEdiCntntTbl = TranslatorService.translateToMirEdiCntntTbl(element);
                msg.ediRepLoginId = user.name;
                await http.post('announcements/bulletinboard', msg);
            }
            return Promise.resolve();
        } catch ( error: any ) {
            error.message ??= "Unknown error message";
            return Promise.reject(error);

        }

    }
    

    public async fetchAll() : Promise<EdiMessage[]> {
        let result: EdiMessage[] = [];

        try {
            let resp = await http.get("announcements/bulletinboard");
            resp.data.forEach((element: any) => {
                result.push(TranslatorService.translateToEdiMessage( element)             );
            });
            return Promise.resolve( result);

        } catch (error: any) {
            error.message ??= "Unknown error message";
            return Promise.reject(error);
        }
    }

    public async fetchLatest() : Promise<EdiMessage[]> {
        let result: EdiMessage[] = [];

        try {
            let resp = await http.get("announcements/bulletinboard/latest");
            resp.data.forEach((element: any) => {
                result.push(TranslatorService.translateToEdiMessage( element)             );
            });
            return Promise.resolve( result);

        } catch (error: any) {
            error.message ??= "Unknown error message";
            return Promise.reject(error);
        }


    }
  

}
