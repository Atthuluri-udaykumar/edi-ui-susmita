import { ProfileModel } from "../../models/profile.model";

export interface IProfileRepository {
    fetchProfile(): Promise<ProfileModel>;
}