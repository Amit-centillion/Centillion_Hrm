import express, { Express } from "express";
import loaders from "./loaders";
import Logger from "./loaders/logger";

export default class Application {
  app: Express = express();

  async init() {
    try {
      await this.loadApplication();
      Logger.info("# Init Completed");
    } catch (error) {
      Logger.error(error);
    }
  }

  async loadApplication() {
    await loaders(this.app);
  }

  getExpressApplication(): Express {
    return this.app;
  }
}
