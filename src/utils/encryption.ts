const crypto = require("crypto-js");
const bcrypt = require("bcrypt");
import { configSettings } from "../config/settings.js";

const cryptoKey = crypto.enc.Hex.parse(crypto.enc.Utf8.parse(configSettings.cryptoKey));
const cryptoIv = crypto.enc.Hex.parse(configSettings.cryptoKey + "a");

let txtEncrypt = (strData: string) => {
  if (!strData) return "";
  let ciphertext = crypto.AES.encrypt(strData, cryptoKey, {
    iv: cryptoIv,
  }).toString();
  let base64EncodedText = Buffer.from(ciphertext, "utf8").toString("base64");
  //let base64EncodedText = ciphertext;
  return base64EncodedText;
};
let txtDecrypt = (strData: string) => {
  if (!strData) return "";
  let base64DecodedText = Buffer.from(strData, "base64").toString("utf8");
  //let base64DecodedText = strData;
  let bytes = crypto.AES.decrypt(base64DecodedText, cryptoKey, {
    iv: cryptoIv,
  });
  let originalText = bytes.toString(crypto.enc.Utf8);
  return originalText;
};
let objEncrypt = (objData: Object) => {
  let ciphertext = crypto.AES.encrypt(JSON.stringify(objData), configSettings.cryptoKey).toString();
  let base64EncodedText = Buffer.from(ciphertext, "utf8").toString("base64");
  return base64EncodedText;
};
let objDecrypt = (strData: string) => {
  let base64DecodedText = Buffer.from(strData, "base64").toString("utf8");
  let bytes = crypto.AES.decrypt(base64DecodedText, configSettings.cryptoKey);
  let decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));
  return decryptedData;
};
let hashPassword = async (password: string) => {
  const saltRounds = 10; // Adjust the number of salt rounds as needed
  const hashedPassword: string = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
let crypto2 = "$mykey";
let cryptoiv2 = "$mykey";
const txtDecryptFromApp = (strData: string) => {
  if (!strData) return "";
  try {
    const key = crypto.enc.Utf8.parse(crypto2);
    const iv = crypto.enc.Utf8.parse(cryptoiv2);
    const decrypted = crypto.AES.decrypt(strData, key, {
      iv,
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7,
    });
    return decrypted.toString(crypto.enc.Utf8);
  } catch (error) {
    console.error(error);
    return "";
  }
};
let encryption = {
  txtEncrypt,
  txtDecrypt,
  objEncrypt,
  objDecrypt,
  hashPassword,
  txtDecryptFromApp,
};
export default encryption;
