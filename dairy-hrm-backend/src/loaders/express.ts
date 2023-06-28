import express from "express";
import cors from "cors";
import config from "../config";
import httpStatus from "http-status";
import apiRoutes from "../api";

export default async (app: express.Application) => {
  /**
   * Health check status
   */

  app.get(`${config.api.prefix}/status`, (req, res) => {
    try {
      return res.status(httpStatus.OK).json({ message: "API Working" });
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  });

  /**
   * Enable CORS Origin
   */

  app.use(cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(
    express.json({
      type: "*/json",
      strict: false,
    })
  );

  // Load API routes
  app.use(config.api.prefix, apiRoutes);

  // / catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });
};
