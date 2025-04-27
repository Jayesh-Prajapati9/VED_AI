import Express from "express";
import {
    userLogout,
    userProfile,
    userSignIn,
    userSignUp,
} from "../controllers/userController";
import { userAuth } from "../middlewares/userMiddleWare";

const router = Express.Router();

// @ts-ignore
router.post("/signup", userSignUp);
router.post("/signin", userSignIn);
router.get("/profile", userAuth, userProfile);
router.post("/logout", userAuth, userLogout);

export default router;
