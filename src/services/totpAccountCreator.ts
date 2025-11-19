import { IUuidGenerator } from '../contracts/IUuidGenerator';
import { ISecretGenerator } from '../contracts/ISecretGenerator';
import { IQrCodeGenerator } from '../contracts/IQrCodeGenerator';
import { ICreateTotpRepository } from '../contracts/ICreateTotpRepository';
import {TotpAccount} from "../models/totpAccount";
import {ICreateTotpService} from "../contracts/ICreateTotpService";

export class CreateTotpService implements ICreateTotpService{
    constructor(
        private readonly uuidGenerator:IUuidGenerator,
        private readonly secretGenerator: ISecretGenerator,
        private readonly qrCodeGenerator: IQrCodeGenerator,
        private readonly createTotpRepository: ICreateTotpRepository
    ) {}

    public async execute(label:string, issuer:string, userID:string):Promise<TotpAccount>{
        const accountID = this.uuidGenerator.generate();
        const secret = this.secretGenerator.generate();
        const createdAt = new Date().toISOString();
        const encodedIssuer = encodeURIComponent(issuer);
        const encodedLabel = encodeURIComponent(label);
        const otpAuthUri = `otpauth://totp/${encodedIssuer}:${encodedLabel}?secret=${secret}&issuer=${encodedIssuer}`;
        const qrCodeBase64 = await this.qrCodeGenerator.generate(otpAuthUri);
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
