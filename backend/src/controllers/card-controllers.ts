import { getCardDataByUserId } from "@/services/card-services";
import { createHandler } from "@/utils/create";

export const getCardDataByUserIdController = createHandler(async (req, res) => {
  const data = await getCardDataByUserId(req.params.id as string);
  res.status(200).json(data);
});
