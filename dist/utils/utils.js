import * as fs from "fs";
//@ts-ignore
import moment from "moment";
//@ts-ignore
import sharp from "sharp";
//const crypto = require("crypto");
const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
};
const isValidDate = (inputDate) => {
    try {
        const formats = ["YYYY-MM-DD", "YYYY-MM-DD HH:mm:ss"];
        const momentDate = moment(inputDate, formats, true);
        if (momentDate.isValid()) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
};
const generateRandomString = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
};
const getSeoulTime = () => {
    const seoulTimeZone = "Asia/Seoul";
    const options = {
        timeZone: seoulTimeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    };
    const seoulTime = new Date().toLocaleString("en-US", options);
    return seoulTime;
};
async function getFileSize(filePath) {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err, stats) => {
            if (err) {
                return 0;
            }
            else {
                resolve(stats.size);
            }
        });
    });
}
// Function to convert an image to webp and save it
const convertToWebP = async (inputPath, outputPath) => {
    await sharp(inputPath).webp().toFile(outputPath);
};
const convertToWebP_V2 = async (inputPath, outputPath) => {
    await sharp(inputPath)
        .resize({ width: 1920, fit: sharp.fit.inside, withoutEnlargement: true })
        .webp() //{ lossless: false, quality: 50 }
        .toFile(outputPath);
};
const checkImgIsWebp_and_in1920 = async (inputPath) => {
    try {
        // Read image data
        const imageData = await fs.promises.readFile(inputPath);
        // Use Sharp to identify format and get image info
        const imageInfo = await sharp(imageData).metadata();
        // Check format and width
        return imageInfo.format === "webp" && imageInfo.width <= 1920;
    }
    catch (error) {
        console.error("Error checking image:", error);
        return false; // Or throw an error if needed
    }
};
function sanitizeFileName(fileName) {
    try {
        // Define a regular expression with characters not allowed in file names
        const invalidCharsRegex = /[\/\?<>\\:\*\|":]/g;
        // Replace invalid characters with an underscore
        const sanitizedFileName = fileName?.replace(invalidCharsRegex, "_") ?? "";
        return sanitizedFileName;
    }
    catch (error) {
        return "";
    }
}
function hasAllRequiredKeys(requiredKeysString, dataArray) {
    const requiredKeys = requiredKeysString.split(",").map((key) => key.trim());
    return dataArray.every((obj) => {
        const hasRequiredKeys = requiredKeys.every((key) => key in obj);
        if (!hasRequiredKeys) {
        }
        return hasRequiredKeys;
    });
}
/** origin 과 tobe_coppied 의 key를 비교하여 같은키가 있으면, origin 에 값을 변경시켜주는 함수 */
const assignMatchedKeyValue = async (origin, tobe_copied) => {
    Object.keys(tobe_copied).forEach((key) => {
        if (origin.hasOwnProperty(key)) {
            origin[key] = tobe_copied[key];
        }
    });
};
const clampNumber = (num, min, max) => Math.max(Math.min(num, Math.max(min, max)), Math.min(min, max));
//  앱 버전 양식
function isValidVersionString(str) {
    // 정규표현식을 사용하여 "숫자.숫자.숫자" 형식 확인
    var regex = /^\d+\.\d+\.\d+$/;
    return regex.test(str);
}
function jsonStringifyWithBigInt(obj) {
    return JSON.stringify(obj, (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    );
}
let utils = {
    isValidEmail,
    generateRandomString,
    getSeoulTime,
    getFileSize,
    convertToWebP,
    convertToWebP_V2,
    sanitizeFileName,
    isValidDate,
    hasAllRequiredKeys,
    clampNumber,
    checkImgIsWebp_and_in1920,
    assignMatchedKeyValue,
    isValidVersionString,
    jsonStringifyWithBigInt,
};
export default utils;
//# sourceMappingURL=utils.js.map