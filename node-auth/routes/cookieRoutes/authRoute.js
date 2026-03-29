
import express from "express"
import { getUser, login, register } from "../../controllers/cookieBasedController/authController.js"
import { protect } from "../../middlewares/cookieMiddleware/authMiddleware.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/getUser", protect, getUser)

export default router