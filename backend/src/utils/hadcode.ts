import type { NewUser } from "@/schema/user";
import { addUser, getUserByEmail } from "@/services/user-services";

const hardUser: NewUser = {
  email: "bateteangenadette@gmail.com",
  name: "Ange Nadette BATETE",
  password: "123",
};

export const init = async () => {
  const user = await getUserByEmail(hardUser.email);
  if (!user) {
    await addUser(hardUser);
  }
};
