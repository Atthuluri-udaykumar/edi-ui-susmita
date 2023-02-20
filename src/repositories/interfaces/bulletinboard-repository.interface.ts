import { EdiMessage } from "../../models/edi-message.model";
import { User } from "../../types/custom";

export interface IBulletinBoardRepository {

    fetchAll(): Promise<EdiMessage[]>;

    fetchLatest(): Promise<EdiMessage[]>;

    updateMessages( user: User, message: EdiMessage[]): Promise<void>;
}