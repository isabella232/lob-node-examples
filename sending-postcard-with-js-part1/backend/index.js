import express from "express";
import cors from "cors";
import router from "./router.js";
 
import dotenv from "dotenv";
dotenv.config();
 
const app = express();
const port = process.env.PORT || 3030;
 
app.use(cors());
 
app.use("/", router);
 
app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
