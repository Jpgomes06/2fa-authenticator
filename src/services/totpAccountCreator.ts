import { IUuidGenerator } from '../contracts/IUuidGenerator';
import { ISecretGenerator } from '../contracts/ISecretGenerator';
import { IQrCodeGenerator } from '../contracts/IQrCodeGenerator';
import { ICreateTotpRepository } from '../contracts/ICreateTotpRepository';
import {TotpAccount} from "../models/totpAccount";

export class CreateTotpService{
    constructor(
        private readonly uuidGenerator:IUuidGenerator,
        private readonly secretGenerator: ISecretGenerator,
        private readonly qrCodeGenerator: IQrCodeGenerator,
        private readonly createTotpRepository: ICreateTotpRepository
    ) {}

    async createTotpAccount(label:string, issuer:string, userID:string):Promise<TotpAccount>{
        const accountID = this.uuidGenerator.generate();
        const secret = this.secretGenerator.generate();
        const createdAt = new Date().toISOString();
        const encodedIssuer = encodeURIComponent(issuer);
        const encodedLabel = encodeURIComponent(label);
        const otpAuthUri = `otpauth://totp/${encodedIssuer}:${encodedLabel}?secret=${secret}&issuer=${encodedIssuer}`;
        const qrCodeBase64 = this.qrCodeGenerator.generate(otpAuthUri);
        const payload:TotpAccount = { label, issuer, userID, accountID, secret, createdAt }
        const published = await this.createTotpRepository.execute(payload);
        if(!published) throw new Error('Error sending to queue!');
        return {
            ...payload,
            otpAuthUri,
            qrCodeBase64
        }
    }
}
