import {TotpAccount} from "../models/totpAccount";

export interface ICreateTotpRepository {
    execute(totpAccount:TotpAccount): Promise<boolean | undefined>;
}
