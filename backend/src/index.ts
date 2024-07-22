import express from "express";
import api from "./api/api";

const app = express();

app.use("/api/v1", api);

app.listen(3000, () => console.log("Listening"));
