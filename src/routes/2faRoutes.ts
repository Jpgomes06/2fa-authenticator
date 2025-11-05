import express from 'express';
import { CreateAccountController } from '../controllers/createAccountController';

const createAccountController = new CreateAccountController();

export function createTotpAccount() {
    const router = express.Router();
    router.post('/', createAccountController.createAccount);
    return router;
}
