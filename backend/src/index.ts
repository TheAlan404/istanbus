import express from "express";
import api from "./api/api";
import { existsSync } from "fs";

const app = express();

app.use("/api/v1", api);

const staticDir = "../frontend/dist";

if(existsSync(staticDir)) {
    app.use(express.static(staticDir));
    console.log("Serving static folder");
}

app.listen(3000, () => console.log("Listening"));
