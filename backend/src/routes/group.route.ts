import express from "express";
import { createGroup, getGroups, sendGroupMessage, getGroupMessages } from "../controllers/group.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute, createGroup);
router.get("/", protectRoute, getGroups);
router.post("/message/:groupId", protectRoute, sendGroupMessage);
router.get("/messages/:groupId", protectRoute, getGroupMessages);

export default router; 