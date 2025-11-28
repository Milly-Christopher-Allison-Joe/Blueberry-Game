import express from "express";
import getUserFromToken from "./server/middleware/getUserFromToken.js";

const app = express();

app.use(express.json());
app.use(getUserFromToken);

export default app;
