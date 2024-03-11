import { Router } from "express";
//router 인스턴스를 하나 만들고
const router = Router();
import { client } from "@gradio/client";
router.get("/test1", async function (req, res) {
    try {
        //@ts-ignore
        const app = await client("abidlabs/whisper");
        const app_info = await app.view_api();
        return res.status(200).json({ success: true, data: app_info });
    }
    catch (error) {
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
//# sourceMappingURL=gradio.js.map