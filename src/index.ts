import express from 'express';
import { createTotpAccount } from './routes/2faRoutes';
import { RabbitMQGateway } from './infra/rabbitmq-gateway'
import 'dotenv/config';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/2fa/totp', createTotpAccount());

app.listen(PORT, () => {
    const rabbitMQConnection = new RabbitMQGateway();
    console.log(`Server running on http://localhost:${PORT}`);
});
