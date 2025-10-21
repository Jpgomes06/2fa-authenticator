import { Request, Response } from 'express';
import { CreateTotp } from '../services/totpAccountCreator';

export class CreateAccountController {
    createAccount(req: Request, res: Response) {
        const { label, issuer, user_id } = req.body;
        const create = new CreateTotp(label, issuer, user_id);
        const totpCreated = create.createTotpAccount();
        return res.status(200).json({
            message: 'Created TOTP successfully',
            data: {
                totp: totpCreated
            }
        });
    }
};
