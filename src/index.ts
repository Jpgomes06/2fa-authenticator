import express from 'express';
import 'dotenv/config';
import { createTotpAccountRouter } from './routes/2faRoutes';
import {errorHandler} from "./middlewares/error";
import { CreateTotpService } from './services/totpAccountCreator'
import { CreateAccountController } from './controllers/createAccountController'
import { UuidProvider } from "./services/uuidProvider";
import { SecretProvider } from "./services/secretProvider";
import {QrCodeProvider} from "./services/qrCodeProvider";
import {CreateTotpRepository} from "./repositories/createTotpRepository";

const app = express();
const PORT = 3000;
const uuidProvider = new UuidProvider();
const secretProvider = new SecretProvider();
const qrCodeProvider = new QrCodeProvider();
const createTotpProvider = new CreateTotpRepository();

const createTotpService = new CreateTotpService(uuidProvider, secretProvider, qrCodeProvider, createTotpProvider);
const createAccountController = new CreateAccountController(createTotpService);

app.use(express.json());
app.use('/2fa/totp', createTotpAccountRouter(createAccountController));
app.use(errorHandler);

app.listen(PORT,() => {
    console.log(`Server running on http://localhost:${PORT}`);
});
