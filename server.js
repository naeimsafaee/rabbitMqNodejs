require("dotenv").config();

const config = require("config");
const serverConfig = config.get("server");

require("./cron");

const app = require("./lib/app");

process.on("uncaughtException", (ex) => {
	console.log(ex);
	// throw ex;
});
process.on("unhandledRejection", (ex) => {
	console.log(ex);
	// throw ex;
});

const rabbit = require("./lib/databases/rabbit");

console.log(`*** SERVER Info: ENVIRONMENT: ${process.env.NODE_ENV}`);
console.log(`*** SERVER Info: Please wait; Starting...`);

const server = app.listen(serverConfig.port, async () => {
	console.log(`*** SERVER Info: Server is running on port ${serverConfig.port}...`);

	const channel = await rabbit.createQueue(); // create queue
	rabbit.consumer(channel); //run consumer

});

