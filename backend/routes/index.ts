import { Router } from "express";
import authRouter from "./auth";
import { checkToken } from "../middlewares/auth.middleware";
import spotify from "./spotify";

const router: Router = Router();

router.use("/auth", authRouter);
router.use("/spotify", checkToken, spotify);

export default router;
