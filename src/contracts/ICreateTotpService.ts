import {TotpAccount} from "../models/totpAccount";

export interface ICreateTotpService {
    execute(label:string, issuer:string, userID:string):Promise<TotpAccount>
}
