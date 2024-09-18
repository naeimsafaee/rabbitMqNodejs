const CronJob = require("cron").CronJob;
const {send , getChannel} = require("../lib/databases/rabbit");

const addFakeDataToRabbit = new CronJob("*/10 * * * *",async () => {

    const currentTime = new Date().toISOString();
    const message = `Hello from node js at ${currentTime}`;

    console.log(message);

    await send(getChannel() , JSON.stringify({message}));

});

addFakeDataToRabbit.start();
