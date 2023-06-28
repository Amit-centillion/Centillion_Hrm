import dotenv from "dotenv";

const env = dotenv.config();

if (env.error) {
  throw new Error("Could not find .env file");
}

export default {
  name: process.env.NAME || "dairy-hrm",
  environment: process.env.ENVIRONMENT || "development",
  port: process.env.PORT,

  /**
   * DATABASE
   */
  database: {
    host: process.env.MONGO_URL,
    name: process.env.MONGO_DB,
  },

  /**
   * LOGS
   */
  logs: {
    level: process.env.LOG_LEVEL || "info",
  },
  /**
   * API
   */
  api: {
    prefix: "/api/v1",
  },

  /**
   * SECRETS
   */

  secrets: {
    jwt: process.env.JWT_SECRET || "DAIRY_JWT_SECRET",
    jwt_expirty: process.env.JWT_EXPIRY || 4,
  },

  /**
   * ADMIN CREDETIALS
   */
  admin: {
    email: "admin@gmail.com",
    firstName: "Centillion",
    lastName: "Softech",
    role: "ADMIN",
    password: "admin123",
  },
};
