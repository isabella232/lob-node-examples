import { Router } from "express";
 
import createTemplate from "./template/create.js";
import listTemplates from "./template/list.js";
 
import createPostcard from "./postcard/create.js";
const router = new Router();
 
router.post("/templates/create", createTemplate);
router.get("/templates", listTemplates);
router.post("/postcard/create", createPostcard);
 
export default router;


