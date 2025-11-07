import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(4, { message: "Введите корректный пароль" });

export const formLoginSchema = z.object({
  email: z.email({ message: "Введите корректную почту" }),
  password: passwordSchema,
});
export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      username: z.string().min(2, { message: "Введите имя и фамилию" }),
      passwordRepeat: passwordSchema,
    })
  )
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Пароли не совпадают",
    path: ["passwordRepeat"],
  });

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
