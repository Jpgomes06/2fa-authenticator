import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';
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
    async createTotpAccount(){
        const accountID = uuidv4();
        const secret = generateSecret();
        const createdAt = new Date().toISOString();
        const issuer = encodeURIComponent(this.issuer);
        const label = encodeURIComponent(this.label);
        const otpAuthUri = `otpauth://totp/${issuer}:${label}?secret=${secret}&issuer=${issuer}`
        const qrCodeBase64 = await QRCode.toDataURL(otpAuthUri);
        return {
            label: this.label,
            issuer: this.issuer,
            user_id: this.user_id,
            account_id: accountID,
            secret: secret,
            created_at: createdAt,
            otpauth_uri: otpAuthUri,
            qrcode_base64: qrCodeBase64
        }
    }
}
