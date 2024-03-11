import { Redis } from "ioredis";
import { configSettings } from "./config/settings.js";
import * as cm from "./utils/common_modules.js";
import utils from "./utils/utils.js";

let redisClient: Redis | null = null;
let redisPub: Redis | null = null;
let redisSub: Redis | null = null;

const channelNames = {
  master_db: "master_db",
  common_db: "common_db",
  service_db: "service_db",
};

if (!redisClient) {
  redisClient = new Redis({
    host: configSettings.redisDB.host, // Your Redis server's host
    port: configSettings.redisDB.port, // Your Redis server's port
    password: configSettings.redisDB.password,
  });
}
if (!redisPub) {
  redisPub = new Redis({
    host: configSettings.redisDB.host, // Your Redis server's host
    port: configSettings.redisDB.port, // Your Redis server's port
    password: configSettings.redisDB.password,
  });
}
if (!redisSub) {
  redisSub = new Redis({
    host: configSettings.redisDB.host, // Your Redis server's host
    port: configSettings.redisDB.port, // Your Redis server's port
    password: configSettings.redisDB.password,
  });
}
redisSub?.subscribe("service_db", (err, count) => {
  if (err) {
    // Just like other commands, subscribe() can fail for some reasons,
    // ex network issues.
    console.error("Failed to subscribe: %s", err.message);
  } else {
    // `count` represents the number of channels this client are currently subscribed to.
    console.log(`Subscribed successfully! This client is currently subscribed to ${count} channels.`);
  }
});
export default {
  redisClient,
  redisPub,
  redisSub,
  channelNames,
};
