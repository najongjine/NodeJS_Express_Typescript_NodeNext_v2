import { Router } from "express";
import { langCode, errorCode, cCodes } from "../../utils/error_code.js";
import encryption from "../../utils/encryption.js";
import * as cm from "../../utils/common_modules.js";
import * as moment from "moment-timezone";
import * as fs from "fs";
import { configSettings } from "../../config/settings.js";

//router 인스턴스를 하나 만들고
const router = Router();

import axios from "axios";
import redis from "../../redis.js";
import utils from "../../utils/utils.js";
import { t_user } from "@prisma/client";

router.get("/test1", async function (req: any, res) {
  try {
    let user = (await cm.prisma.t_user.findMany()) as t_user[];
    res.status(200).json({ success: true, data: user });
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
