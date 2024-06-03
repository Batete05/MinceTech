import { type InferSelectModel } from "drizzle-orm";
import { pgTable, real, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const cards = pgTable("cards", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  balance: real("balance").notNull().default(150000),
  number: varchar("number", { length: 255 }),
  name: varchar("name", { length: 255 }),
  type: varchar("type", { length: 255 }),
  uid: varchar("uid", { length: 255 }),
  user_id: varchar("user_id", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const selectCardSchema = createSelectSchema(cards);

export const addCardSchema = z.object({
  body: selectCardSchema.pick({
    balance: true,
    user_id: true,
    name: true,
    number: true,
    type: true,
    uid: true,
  }),
});
export type Card = InferSelectModel<typeof cards>;
export type AddCard = z.infer<typeof addCardSchema>["body"];
