import express from "express";
import dependencyInjector from "./dependencyInjector";
import Logger from "./logger";
import loadDatabase from "./mongoose";
import loadExpress from "./express";
import loadScript from "./script";

export default async (app: express.Application) => {
  await loadDatabase();
  Logger.info("# Database Connected");

  await dependencyInjector();
  Logger.info("# Dependency Injector loaded");

  await loadScript();
  Logger.info("# Script Loaded");

  await loadExpress(app);
  Logger.info("# Express Loaded");
};
