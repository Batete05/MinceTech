import {
  getVerifications,
  verifyVerification,
} from "@/services/verification-services";
import { createHandler } from "@/utils/create";

export const handleVerifyVerifcation = createHandler(async (req, res) => {
  const id = req.params.id as string;
  const status = req.body.status;
  const verification = await verifyVerification({
    id,
    isVerified: true,
    status,
  });
  res.status(200).json(verification);
});

export const getVerificationsController = createHandler(async (_req, res) => {
  const data = await getVerifications();
  res.status(200).json(data);
});
