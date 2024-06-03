import { getCardDataByUserIdController } from "@/controllers/card-controllers";
import { createRouter } from "@/utils/create";
import type { Router } from "express";

export default createRouter((router: Router) => {
  router.get('/:id', getCardDataByUserIdController);
});
