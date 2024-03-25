import { Router } from "express";
import * as cm from "../../utils/common_modules.js";
//router 인스턴스를 하나 만들고
const router = Router();
router.get("/select", async function (req, res) {
    try {
        let test1 = await cm.prisma.t_test1.findMany();
        let test1_test2 = await cm.prisma.t_test1.findMany({ include: { t_test2: true } });
        let test1_test2_test3 = await cm.prisma.t_test1.findMany({ include: { t_test2: { include: { t_test3: true } } } });
        return res.json({ success: true, data: { test1_test2, test1_test2_test3 } });
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
router.get("/create", async function (req, res) {
    try {
        let data = await cm.prisma.t_test1.create({ data: { name: "1" } });
        return res.json({ success: true, data: data });
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
router.get("/create2", async function (req, res) {
    try {
        let test1 = await cm.prisma.t_test1.findFirst();
        let test2 = {};
        test2.name = "1.1";
        test2.test1_id = test1.id;
        let data = await cm.prisma.t_test2.create({ data: test2 });
        return res.json({ success: true, data: data });
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
router.get("/update", async function (req, res) {
    try {
        let test1 = await cm.prisma.t_test1.findFirst();
        test1.name = test1.name + "u";
        test1 = await cm.prisma.t_test1.update({ where: { id: test1.id }, data: test1 });
        return res.json({ success: true, data: test1 });
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
router.get("/transaction", async function (req, res) {
    try {
        let test1 = await cm.prisma.t_test1.findFirst();
        await cm.prisma.$transaction(async (tx) => {
            test1.name = test1.name + "u";
            test1 = await tx.t_test1.update({ where: { id: test1.id }, data: test1 });
        });
        return res.json({ success: true, data: test1 });
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
router.get("/delete", async function (req, res) {
    try {
        await cm.prisma.t_test1.delete({ where: { id: BigInt(1) } });
        return res.json({ success: true, data: null });
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
router.get("/rawquery", async function (req, res) {
    try {
        let id = BigInt(0);
        let iname = "%u%";
        let test1 = await cm.prisma.$queryRaw `
    SELECT
    *
    FROM t_test1
    WHERE 1=1
    AND id > ${id}
    AND name LIKE ${iname}
    `;
        return res.json({ success: true, data: test1 });
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