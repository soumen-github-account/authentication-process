
import express from "express"
import { getUser, login, logout, register } from "../../controllers/sessionBasedControler/authController.js";
import { isAuthenticated } from "../../middlewares/sessionMiddleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/dashboard", isAuthenticated, (req, res)=>{
    res.json({"message":"Welcome to dashboard"})
})
router.get("/getUser", isAuthenticated, getUser)


export default router;