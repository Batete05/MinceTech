import { verifyVerification } from "@/services/verification-services";
import { createHandler } from "@/utils/create";

export const handleVerifyVerifcation = createHandler(async (req, res) => {
  const id = req.params.id as string;
  const verification = await verifyVerification({
    id,
    isVerified: true,
  });
  res.status(200).json(verification);
});
