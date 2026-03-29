
import express from "express"
import { getUser, login, refreshAccessToken } from "../../controllers/jwtBasedController/authController.js"
import { protect } from "../../middlewares/jwtMiddleware/authMiddleware.js"

const router = express.Router()

router.post("/login", login)
router.post("/refresh-token", refreshAccessToken)

router.get("/getUser", protect, getUser)

export default router