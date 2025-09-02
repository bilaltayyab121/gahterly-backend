import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import eventRoutes from "./event.routes";
import participantRoutes from "./participant.routes";
import hostRoutes from "./host.routes";

const router = Router();

// Group all routes here
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/event", eventRoutes);
router.use("/participant", participantRoutes);
router.use("/host", hostRoutes);

export default router;
