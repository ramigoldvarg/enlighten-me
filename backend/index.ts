import express, { json } from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import router from "./routes";
import { Token } from "./utils/types/Token";

dotenv.config();

const app = express();
const port: number = +process.env.PORT!;

declare module "express-session" {
  interface SessionData {
    token: Token;
  }
}

app.use(morgan("common"));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "ramissecretsecret",
    saveUninitialized: false,
    resave: true,
  })
);
app.use(json());
app.use(cors());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Listening on: ${port}`);
});
