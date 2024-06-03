import {
  verifications,
  type NewVerification,
  type UpdateVerification,
} from "@/schema/verification";
import { db } from "@/utils/db";
import { BackendError } from "@/utils/errors";
import { eq } from "drizzle-orm";

export const createVerification = async (data: NewVerification) => {
  return await db.insert(verifications).values(data).returning();
};

export const verifyVerification = async (data: UpdateVerification) => {
  if (data.id) {
    const verification = await db
      .select({
        expiresAt: verifications.expiresAt,
      })
      .from(verifications)
      .where(eq(verifications.id, data.id));
    if (verification.length > 0 && verification[0]?.expiresAt) {
      const currentDate = new Date();
      const parsedExpiryDate = new Date(verification[0]?.expiresAt);
      const isExpired = currentDate > parsedExpiryDate;
      if (!isExpired) {
        return await db
          .update(verifications)
          .set(data)
          .where(eq(verifications.id, data.id))
          .returning({
            id: verifications.id,
            isVerified: verifications.isVerified,
          });
      } else {
        throw new BackendError("EXPIRED");
      }
    } else {
      throw new BackendError("NOT_FOUND");
    }
  } else {
    throw new BackendError("BAD_REQUEST");
  }
};

export const getVerifications = async (id: string) => {
  return db.select().from(verifications).where(eq(verifications.id, id));
};
