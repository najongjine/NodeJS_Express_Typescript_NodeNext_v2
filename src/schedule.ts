//const schedule = require('node-schedule');
import schedule from "node-schedule";
import { configSettings } from "./config/settings.js";
import * as cm from "./utils/common_modules.js";
import utils from "./utils/utils.js";
import axios from "axios";

//@ts-ignore
import moment from "moment-timezone";

// every midnight
const job = schedule.scheduleJob("0 0 0 * * *", async function () {
  if (+(process?.env?.NODE_APP_INSTANCE ?? 0) > 0) return;
  if (configSettings?.ENV_MODE?.toLocaleLowerCase()?.includes("dev")) return;
});
