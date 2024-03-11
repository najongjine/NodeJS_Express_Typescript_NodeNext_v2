//const schedule = require('node-schedule');
import schedule from "node-schedule";
import { configSettings } from "./config/settings.js";
// every midnight
const job = schedule.scheduleJob("0 0 0 * * *", async function () {
    if (+(process?.env?.NODE_APP_INSTANCE ?? 0) > 0)
        return;
    if (configSettings?.ENV_MODE?.toLocaleLowerCase()?.includes("dev"))
        return;
});
//# sourceMappingURL=schedule.js.map