import { signUp, logIn } from "../controller/auth.controller.js";

import { Router } from "express";

const router = Router();

router.post("/signup", signUp); //public api end points
router.post("/login", logIn);
export default router;
