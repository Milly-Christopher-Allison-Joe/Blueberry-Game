import express from "express";
import usersRouter from "#routes/users";
import getUserFromToken from "#middleware/getUserFromToken";

const app = express();

app.use(express.json());
app.use(getUserFromToken);
app.use("/users", usersRouter);

export default app;
