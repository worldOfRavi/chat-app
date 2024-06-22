import express from 'express';
import { getMessages, sendMessage } from '../controllers/messageController.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.route("/:id").get(protectRoute, getMessages);
router.route("/send/:id").post(protectRoute, sendMessage);

export default router;