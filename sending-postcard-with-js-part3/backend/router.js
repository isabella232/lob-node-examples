import { Router } from "express";
import createTemplate from "./template/create.js";
import listTemplates from "./template/list.js";
import createPostcard from "./postcard/create.js";
import listPostcards from "./postcard/list.js";
import cancelPostcard from "./postcard/delete.js";

const router = new Router();
router.post("/templates/create", createTemplate);
router.get("/templates", listTemplates);
router.post("/postcard/create", createPostcard);
router.get("/postcard/list", listPostcards);
router.get("/postcard/cancel/:id", cancelPostcard);


 
export default router;