const ENV_MODE = process?.env?.NODE_ENV ?? "development";
let PORT = 3000;
let redisDB = {
    host: "127.0.0.1",
    port: 6379,
    username: "", // needs Redis >= 6
    password: "NaverCloudSyCompanyReDisPassWord112233332211!!@@####@@!!",
    db: 0,
};
let appDB = {
    type: "postgres",
    host: "223.130.147.85",
    port: 5432,
    username: "postgres",
    password: "NaverCloud111@@##",
    database: "tenseconds",
    synchronize: false,
    logging: false,
};
const cryptoKey = "cryptoKeyForSyCompany@a#@$b%#%$#@!!ForSyCompany";
const jwtKey = "jwtKeyForSyCompany@#a@$b%#%$#@!!ForSyCompany";
let img_file_upload_path = "/root/File/temp";
let serverUrl = "http://dev.syurl.co.kr:10007";
let imgSreamUrl = `${serverUrl}/api/stream/image`;
const nestyleUrl = "http://1.215.235.253:37021";
let mongoDBConnString = "";
if (ENV_MODE == "local" || ENV_MODE == "development") {
    appDB.type = "postgres";
    appDB.host = "dev.syurl.co.kr";
    appDB.port = 5432;
    appDB.username = "postgres";
    appDB.password = "SyCompanyPostGreSQLPassWord112233332211!!@@####@@!!";
    appDB.database = "tenseconds";
    appDB.synchronize = false;
    appDB.logging = false;
    redisDB.host = "dev.syurl.co.kr";
    redisDB.password = "SyCompanyReDisPassWord112233332211!!@@####@@!!";
    redisDB.db = 0;
    if (ENV_MODE === "local") {
        img_file_upload_path = "C:/Users/DAIN/Pictures/normal_upload";
        serverUrl = `http://localhost:${PORT}`;
    }
    if (ENV_MODE === "development") {
        img_file_upload_path = "/home/inte/file/tenseconds/normalupload";
        serverUrl = `http://dev.syurl.co.kr:${PORT}`;
    }
}
export const configSettings = {
    redisDB,
    appDB,
    ENV_MODE,
    cryptoKey,
    jwtKey,
    mongoDBConnString,
    PORT,
    img_file_upload_path,
    serverUrl,
    nestyleUrl,
    imgSreamUrl,
};
//# sourceMappingURL=settings.js.map