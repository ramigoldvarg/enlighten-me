import express, { json } from "express";
import * as dotenv from "dotenv";
import router from "./routes";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

const app = express();
const port: number = +process.env.PORT!;

app.use(morgan("common"));
app.use(json());
app.use(cors());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Listening on: ${port}`);
});
