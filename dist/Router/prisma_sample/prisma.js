import { Router } from "express";
import * as cm from "../../utils/common_modules.js";
//router 인스턴스를 하나 만들고
const router = Router();
router.get("/test1", async function (req, res) {
    try {
        let user = (await cm.prisma.t_user.findMany());
        res.status(200).json({ success: true, data: user });
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
//# sourceMappingURL=prisma.js.map