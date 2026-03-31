import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import UserController from "./controller.js";
import { updateProfileSchema, validate } from "./validation.js";

const router = Router();

router.get("/profile", authMiddleware, UserController.getProfile);
router.put("/profile", authMiddleware, validate(updateProfileSchema), UserController.updateProfile);
router.delete("/profile", authMiddleware, UserController.deleteAccount);

export default router;
