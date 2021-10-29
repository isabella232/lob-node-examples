import { Router } from "express";
import createTemplate from "./template/create.js";
import listTemplate from "./template/list.js";
const router = new Router();
router.post("/templates/create", createTemplate);

router.get("/templates", listTemplate);
export default router;

