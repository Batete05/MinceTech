import { updateVerificationSchema } from "@/schema/verification";
import { verifyVerification } from "@/services/verification-services";
import { createHandler } from "@/utils/create";


export const handleVerifyVerifcation = createHandler(updateVerificationSchema, async (req, res) => {
  const data = req.body;
  const verification = await verifyVerification(data);
  res.status(200).json(verification);
})
