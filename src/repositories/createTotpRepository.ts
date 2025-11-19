import { ICreateTotpRepository} from "../contracts/ICreateTotpRepository";
import { TotpAccount } from "../models/totpAccount";
import { RabbitMQGateway } from '../infra/rabbitmq-gateway';
const rabbitMQPublisher = new RabbitMQGateway();

export class CreateTotpRepository implements ICreateTotpRepository{
    execute(totpAccount: TotpAccount): Promise<boolean | undefined> {
        return rabbitMQPublisher.publish(totpAccount);
    }
}
