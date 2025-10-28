import { ChannelModel, Channel, connect } from 'amqplib';

export class RabbitMQGateway {
    private connection?: ChannelModel;
    private channel?: Channel;
    private readonly queueName = process.env.QUEUE_NAME || 'otp-accounts';

    constructor() {
        this.connect();
    }

    private async connect():Promise<void> {
        try {
            this.connection = await connect(process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672');
            const channel = await this.connection.createChannel();
            console.log('Connected to RabbitMQ');
        } catch (error) {
            console.error('Error connecting to RabbitMQ:', error);
            throw error;
        }
    }

    // async publish(order: Order): Promise<boolean> {
    //     try {
    //         if (!this.channel) {
    //             await this.connect();
    //         }
    //
    //         const message = JSON.stringify(order);
    //         this.channel?.sendToQueue(this.queueName, Buffer.from(message), {
    //             persistent: true,
    //         });
    //
    //         return true;
    //     } catch (error) {
    //         return false;
    //     }
    // }
}
