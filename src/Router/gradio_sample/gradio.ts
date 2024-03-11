import { Router } from "express";
import { langCode, errorCode, cCodes } from "../../utils/error_code.js";
import encryption from "../../utils/encryption.js";
import * as cm from "../../utils/common_modules.js";
import * as moment from "moment-timezone";
import * as fs from "fs";
import { configSettings } from "../../config/settings.js";

//router 인스턴스를 하나 만들고
const router = Router();

import { client } from "@gradio/client";
import redis from "../../redis.js";
import utils from "../../utils/utils.js";

router.get("/test1", async function (req: any, res) {
  try {
    //@ts-ignore
    const app = await client("abidlabs/whisper");

    const app_info = await app.view_api();

    return res.status(200).json({ success: true, data: app_info });
  } catch (error: any) {
    return res.json({
      success: false,
      data: null,
      custMsg: "router error",
      err: error?.message ?? error,
    });
  }
});

// 등록된 라우터를 export
export default router;
