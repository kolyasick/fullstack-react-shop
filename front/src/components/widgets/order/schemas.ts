import { z } from "zod";

export const formOrderSchema = z.object({
  username: z.string({ error: "Введите ваше имя" }),
  email: z.email({ error: "Введите корректную почту" }),
  comment: z.optional(
    z.string().max(100, { message: "Максимальное кол-во символов - 100" })
  ),
});

export type TFormOrderValues = z.infer<typeof formOrderSchema>;
