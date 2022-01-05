import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

const app = express();
const PORT = 5000;
const dbConnectionString = "mongodb://localhost:27017/lobchecks"
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(express.json({ type: "application/json" }));
app.use(cors());

//views and static files
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'hbs');

mongoose.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", console.error.bind(console, "Connection Error:"));

//require routes
const routes = require("./routes/web.js");
app.use(routes);

app.listen(PORT,(error) => {
  console.log(`Node, is listening on port ${PORT}`);

  if(error){
    console.log(error);
  }
})
