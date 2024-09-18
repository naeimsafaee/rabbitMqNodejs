const amqplib = require("amqplib");
const config = require("config");

const CppToNodeJsQueue = "CppToNodeJs";
const NodeJsToCpp = "NodeJsToCpp";

let channel = null;

async function createQueue() {

    const conn = await amqplib.connect(config.get("databases.rabbitmq.url"));
    channel = await conn.createChannel();

    console.log(`** Queue starts with 2 consumers`);

    return channel;
}

async function send(ch, data) {
    await ch.assertQueue(NodeJsToCpp , { durable: true });
    return ch.sendToQueue(NodeJsToCpp, Buffer.from(data));
}


async function consumer(ch) {
    await ch.assertQueue(CppToNodeJsQueue);
    ch.prefetch(2);

    ch.consume(CppToNodeJsQueue, async (payload) => {
        if (payload !== null) {

            // const _payload = JSON.parse(payload.content.toString());

            console.log("running taskId", payload.content.toString());

            ch.ack(payload);
        } else {
            console.log("Consumer cancelled by server");
        }
    });
}

function getChannel(){
    return channel;
}



module.exports = {
    createQueue,
    consumer,
    send,
    getChannel
};



