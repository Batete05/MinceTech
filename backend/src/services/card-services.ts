import { cards, type AddCard } from "@/schema/card";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";

export const createCard = async (data: AddCard) => {
  const existing_card = await db
    .select({ id: cards.id })
    .from(cards)
    .where(eq(cards.user_id, data.user_id ?? ""));

  if (existing_card.length > 0) {
    return;
  }

  await db.insert(cards).values(data);
};

export const getCardDataByUserId = async (user_id: string) => {
  return await db.select().from(cards).where(eq(cards.user_id, user_id));
};

export const updateCardBalance = async (uid: string, amount: number) => {
  const existing_cards = await db
    .select()
    .from(cards)
    .where(eq(cards.uid, uid));
  if (existing_cards.length > 0) {
    const card = existing_cards[0];
    if (card?.balance) {
      await db.update(cards).set({ balance: card.balance - amount });
    }
  }
};
