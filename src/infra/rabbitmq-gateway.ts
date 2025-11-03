import { ChannelModel, Channel, connect } from 'amqplib';

export class RabbitMQGateway {
    private connection?: ChannelModel;
    private channel?: Channel;
    private readonly queueName = process.env.QUEUE_NAME || 'otp-accounts';

    constructor() {
        this.connect()
    }

    private async connect():Promise<void> {
        try {
            this.connection = await connect(process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672');
            this.channel = await this.connection.createChannel();
            await this.channel.assertQueue(this.queueName, { durable: true });
            console.log('Connected to RabbitMQ');
        } catch (error) {
            throw new Error('Failed to connect to RabbitMQ.');
        }
    }

    public async publish(label:string, issuer:string, user_id:string, account_id:string, secret:string, created_at:string): Promise<boolean | undefined> {
        try {
            if (!this.channel) {
                await this.connect();
            }
            const message = JSON.stringify({label, issuer, user_id, account_id, secret, created_at});
            return this.channel?.sendToQueue(this.queueName, Buffer.from(message), {
                persistent: true,
            });
        } catch (error) {
            throw new Error('Internal server error.');
        }
    }
}
