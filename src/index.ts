import express from "express"; // Example using express
import { PrismaClient } from "@prisma/client";
import * as path from "path";
import "./redis.js";

import { rateLimit } from "express-rate-limit";
import { configSettings } from "./config/settings.js";
import * as common_modules from "./utils/common_modules.js";
import initializeSocket from "./socket.js";

//@ts-ignore
import cors from "cors";
import helmet from "helmet";

import prismaSampleRouter from "./Router/prisma_sample/prisma.js";
import gradioSampleRouter from "./Router/gradio_sample/gradio.js";

import * as dotenv from "dotenv";
import utils from "./utils/utils.js";
dotenv.config();

const app = express();
common_modules.set_app_ref(app);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.set("trust proxy", 3);

// DB connection
const prisma = new PrismaClient();
common_modules.set_prisma(prisma);
BigInt.prototype["toJSON"] = function () {
  return this.toString();
};
// DB connection END

// socket.io
initializeSocket();
// socket.io END

//Too many requests, please try again later.
const getLimitOption = {
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: process?.env?.NODE_ENV == "development" ? 2_147_483_647 : 50,
};
app.get("/", rateLimit(getLimitOption), async (req, res) => {
  return res.status(200).json({
    success: true,
    data: `__dirname : ${__dirname}`,
    custMsg: "",
    errMsg: "",
  });
});
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    if (typeof body === "object") {
      body = utils.jsonStringifyWithBigInt(body); // Use the custom JSON.stringify function
    }
    return originalSend.call(this, body);
  };
  next();
});

app.listen(configSettings.PORT, () => {
  console.log(`Server running on port ${configSettings.PORT}`);
});

app.use("/prisma_sample", rateLimit(getLimitOption), prismaSampleRouter);
app.use("/gradio_sample", rateLimit(getLimitOption), gradioSampleRouter);
