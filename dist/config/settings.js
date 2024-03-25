const ENV_MODE = process?.env?.NODE_ENV ?? "development";
let PORT = 3000;
let redisDB = {
    host: "127.0.0.1",
    port: 6379,
    username: "", // needs Redis >= 6
    password: "mypassword",
    db: 0,
};
const cryptoKey = "cmypassword";
const jwtKey = "jmypassword";
let img_file_upload_path = "/root/File/temp";
let serverUrl = `http://localhost:${PORT}`;
let imgSreamUrl = `${serverUrl}/api/stream/image`;
let mongoDBConnString = "";
if (ENV_MODE == "local" || ENV_MODE == "development") {
    redisDB.host = "myip";
    redisDB.password = "mypassword";
    redisDB.db = 0;
    if (ENV_MODE === "local") {
        img_file_upload_path = "C:/Users/DAIN/Pictures/normal_upload";
        serverUrl = `http://localhost:${PORT}`;
    }
    if (ENV_MODE === "development") {
        img_file_upload_path = "/home/inte/file/tenseconds/normalupload";
        serverUrl = `http://localhost:${PORT}`;
    }
}
export const configSettings = {
    redisDB,
    ENV_MODE,
    cryptoKey,
    jwtKey,
    mongoDBConnString,
    PORT,
    img_file_upload_path,
    serverUrl,
    imgSreamUrl,
};
//# sourceMappingURL=settings.js.map