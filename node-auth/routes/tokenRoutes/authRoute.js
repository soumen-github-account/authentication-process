import express from "express"
import { getUser, login, register } from "../../controllers/tokenBasedController/authController.js";
import { isAuthenticated } from "../../middlewares/tokenMiddleware/authMiddleware.js";

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/get-user", isAuthenticated, getUser)

export default router;