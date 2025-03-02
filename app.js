import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import { PORT } from "./config/env.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscription", subscriptionRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Esse é o app subscribe tracker.");
});

app.listen(PORT, async () => {
  console.log(
    "Subscriptiion Tracker API está rodando em: http://localhost:3000"
  );
  await connectToDatabase();
});

export default app;
