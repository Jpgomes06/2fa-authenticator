import express from 'express';
import 'dotenv/config';
import { createTotpAccount } from './routes/2faRoutes';
import { RabbitMQGateway } from './infra/rabbitmq-gateway';
import {errorHandler} from "./middlewares/error";
import { CreateTotpService } from './services/totpAccountCreator'
import { CreateAccountController } from './controllers/createAccountController'
import { UuidProvider } from "./services/uuidProvider";
import { SecretProvider } from "./services/secretProvider";
import {QrCodeProvider} from "./services/qrCodeProvider";
import {CreateTotpProvider} from "./services/createTotpProvider";

const app = express();
const PORT = 3000;
const uuidProvider = new UuidProvider();
const secretProvider = new SecretProvider();
const qrCodeProvider = new QrCodeProvider();
const createTotpProvider = new CreateTotpProvider();


const rabbitMQGateway = new RabbitMQGateway();
const createTotpService = new CreateTotpService(uuidProvider, secretProvider, qrCodeProvider, createTotpProvider);
const createAccountController = new CreateAccountController();

app.use(express.json());
app.use('/2fa/totp', createTotpAccount());
app.use(errorHandler);

app.listen(PORT => {
    console.log(`Server running on http://localhost:${PORT}`);
});
