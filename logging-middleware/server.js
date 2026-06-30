import express from "express";
import { Log } from "./src/lib/logger.js";

const app = express();

app.get("/", (req, res) => {
  Log("backend", "info", "controller", "Request at /");
  res.send("HEllo world");
});

app.listen(3000, () => console.log("Server started at 3000"));
