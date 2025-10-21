import { v4 as uuidv4 } from 'uuid';
import { generateSecret } from '@colingreybosh/otp-lib';

export class CreateTotp{
    private issuer: string;
    private label: string;
    private user_id: string;

    constructor(label:string, issuer:string, user_id:string) {
        this.label = label
        this.issuer = issuer
        this.user_id = user_id
    }
    createTotpAccount(){
        const accountID = uuidv4();
        const secret = generateSecret();
        const createdAt = new Date().toISOString();
        return {
            label: this.label,
            issuer: this.issuer,
            user_id: this.user_id,
            account_id: accountID,
            secret: secret,
            created_at: createdAt
        }
    }
}
