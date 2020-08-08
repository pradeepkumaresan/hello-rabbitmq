const amqp = require("amqplib");

consume();
async function consume() {
    try{
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");

        console.log("waiting for messages...");

        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Received job with input ${input.number}`);
            channel.ack(message);
        });
    }
    catch(ex){
        console.error(ex);
    }
} 