import {IQrCodeGenerator} from "../contracts/IQrCodeGenerator";
import QRCode from 'qrcode';

export class QrCodeProvider implements IQrCodeGenerator{
     async generate(uri: string): Promise<string> {
        return await QRCode.toDataURL(uri);
    }
}