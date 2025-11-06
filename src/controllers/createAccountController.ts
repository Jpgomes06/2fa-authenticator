import { Request, Response } from 'express';
import {ICreateTotpService} from "../contracts/ICreateTotpService";
import {ICreateTotpController} from "../contracts/ICreateTotpController";

export class CreateAccountController implements ICreateTotpController{
    constructor(
        private readonly createTotpService:ICreateTotpService
    ) {}
    async handle(req: Request, res: Response):Promise<Response>{
        const { label, issuer, user_id: userID } = req.body;
        const totpCreated = await this.createTotpService.execute(label, issuer, userID);
        return res.status(200).json({
            message: 'Created TOTP successfully',
            data: {
                totp: totpCreated
            }
        })
    }
}
