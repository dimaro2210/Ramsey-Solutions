import { Router, type IRouter } from "express";
import healthRouter from "./health";
import askRamseyRouter from "./askramsey";

const router: IRouter = Router();

router.use(healthRouter);
router.use(askRamseyRouter);

export default router;
