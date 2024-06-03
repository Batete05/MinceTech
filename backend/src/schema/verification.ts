import type { InferSelectModel } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const statusEnum = pgEnum("status", ["ACCEPTED", "DECLINED"]);

export const verifications = pgTable("verifications", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  uid: varchar("uid", { length: 256 }).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  isVerified: boolean("is_verified").default(false),
  status: statusEnum("status"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const selectVerificationSchema = createSelectSchema(verifications);

export const insertVerificationSchema = createInsertSchema(verifications);

export const addVerificationSchema = insertVerificationSchema.pick({
  uid: true,
  expiresAt: true,
});

export const updateVerificationSchema = z.object({
  body: insertVerificationSchema.pick({
    isVerified: true,
    status: true,
    id: true,
  }),
});

export type Verification = InferSelectModel<typeof verifications>;
export type NewVerification = z.infer<typeof addVerificationSchema>;
export type UpdateVerification = z.infer<
  typeof updateVerificationSchema
>["body"];
