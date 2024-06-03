import adminRoutes from "@/routes/admin-routes";
import cardRoutes from "@/routes/card-routes";
import userRoutes from "@/routes/user-routes";
import verifyRoutes from "@/routes/verification-routes";
import { createRouter } from "@/utils/create";
import { Router } from "express";

export default createRouter((router: Router) => {
  router.use("/admin", adminRoutes);
  router.use("/user", userRoutes);
  router.use("/verify", verifyRoutes);
  router.use("/card", cardRoutes);
});
