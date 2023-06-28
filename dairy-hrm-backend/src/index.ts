import "reflect-metadata";
import application from "./app";
import config from "./config";
import Logger from "./loaders/logger";

const server = new application();

server.init();

export const app = server.getExpressApplication();

app.listen(config.port, () => {
    Logger.info(`# Application Started`);
});